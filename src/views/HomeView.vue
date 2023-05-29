<template>
  <div class="layout">
    <Aside />
    <div class="container home">
      <TopHeader />
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="标题"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <a :href="`/edit?name=${scope.row.name}`">修改</a>
              <!-- <a :href="`/preview?id=${scope.row.id}`" class="edit preview">预览</a> -->
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

import axios from "axios";
export default {
  name: "HomeView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      loading: true,
      githubrepo: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    };
  },
  methods: {
    async loadData() {
      const tableData = JSON.parse(localStorage.getItem("tableData"));
      // console.log(tableData);
      // 查找是否有历史缓存
      if (tableData) {
        // 有缓存直接插入vue中，提高性能和加载速度，比直接从GitHub api中拿数据要好的多。
        this.tableData = tableData;
        this.loading = false;
      } else {
        // 没有缓存, 重新调用api数据存入缓存中
        axios
          .get("https://api.github.com/repos/" + this.githubrepo + "/contents/content/blog")
          .then((response) => {
            const allData = response.data.slice().reverse();

            // 根据当前页码和每页显示的数量进行数据切片
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.tableData = allData.slice(startIndex, endIndex);
            this.loading = false;


            // 更新总数据量
            this.totalItems = allData.length;
            localStorage.setItem("tableData", JSON.stringify(this.tableData));
          })
          .catch((error) => {
            console.error(error);
          });
      }

    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.loadData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.loadData();
      // 滚动到页面顶部
      window.scrollTo();
    },
  },
  mounted() {
    this.githubrepo = localStorage.getItem("githubRepoHugoToken");

    const BasicData = JSON.parse(localStorage.getItem("BasicData"));
    // console.log(BasicData);
    if (BasicData) {
      // 把数据传入自己需要的地方

    } else {
      // 首次加载会调用api拿数据放在缓存中
      axios
        .get("https://api.github.com/repos/" + this.githubrepo)
        .then((response) => {
          // 把仓库基础数据存入缓存中
          localStorage.setItem("BasicData", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.loadData();
  },
};
</script>
