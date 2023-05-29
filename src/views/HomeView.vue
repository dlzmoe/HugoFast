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

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      >
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
      pageSize: 7,
      totalItems: 0,
    };
  },
  methods: {
    async loadData() {
      axios
        .get("https://api.github.com/repos/" + this.githubrepo + "/contents/content/blog")
        .then((response) => {
          console.log(response.data);

          const allData = response.data.slice().reverse();

          // 根据当前页码和每页显示的数量进行数据切片
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          this.tableData = allData.slice(startIndex, endIndex);
          this.loading = false;

          // 更新总数据量
          this.totalItems = allData.length;
        })
        .catch((error) => {
          console.error(error);
        });
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
    axios
      .get("https://api.github.com/repos/" + this.githubrepo)
      .then((response) => {
        console.log(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
    this.loadData();
  },
};
</script>
