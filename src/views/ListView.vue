<template>
  <div class="layout">
    <Aside />
    <div class="container list">
      <TopHeader />
      <template>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="标题">
            <template slot-scope="scope">
              <span :data-sha="scope.row.sha">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <a :href="`/#/edit?name=${scope.row.name}&sha=${scope.row.sha}`" class="edit-btn">修改</a>
              <a href="javascript:void(0)" class="edit-btn" @click="deletepost(scope.row.name, scope.row.sha)">删除文章</a>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import TopHeader from "@/components/TopHeader.vue";

import axios from "axios";
export default {
  name: "ListView",
  components: {
    Aside,
    TopHeader,
  },
  data() {
    return {
      HugoFastghpToken: "",
      bloglistdir: "",
      loading: true,
      githubrepo: "",
      BasicData: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    };
  },
  methods: {
    async loadData() {
      const HugoFastallData = JSON.parse(localStorage.getItem("HugoFastallData"));
      if (HugoFastallData) {
        // 有缓存直接插入vue中，提高性能和加载速度，比直接从GitHub api中拿数据要好的多。
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.tableData = HugoFastallData.slice(startIndex, endIndex);
        this.loading = false;
        // 更新总数据量
        this.totalItems = HugoFastallData.length;
      } else {
        // 没有缓存, 重新调用api数据存入缓存中
        axios
          .get(
            "https://api.github.com/repos/" +
            this.githubrepo +
            "/contents/" +
            this.bloglistdir
          )
          .then((response) => {
            const files = response.data;
            const processedFiles = files.map((file) => {
              // 利用slice方法去掉.md字符
              const processedName = file.name.slice(0, -3);

              // 返回包含处理后的name和其他参数的对象
              return { ...file, name: processedName };
            });

            const HugoFastallData = processedFiles.slice().reverse();
            localStorage.setItem("HugoFastallData", JSON.stringify(HugoFastallData));

            // 根据当前页码和每页显示的数量进行数据切片
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.tableData = HugoFastallData.slice(startIndex, endIndex);
            this.loading = false;
            // 更新总数据量
            this.totalItems = HugoFastallData.length;
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
    },
    // 删除文章
    async deletepost(name, sha) {
      this.$message.warning('删除功能仍在开发中!');
      // axios
      //   .delete(
      //     "https://api.github.com/repos/" +
      //     this.githubrepo +
      //     "/contents/" +
      //     this.bloglistdir +
      //     "/" +
      //     name +
      //     ".md",
      //     {
      //       owner: this.BasicData.owner.login,
      //       repo: this.BasicData.name,
      //       path: this.bloglistdir + "/" + name + ".md",
      //       message: "删除文章" + name,
      //       committer: {
      //         name: this.BasicData.owner.login,
      //         email: "shuxhan@163.com",
      //       },
      //       sha: sha,
      //     },
      //     {
      //       headers: {
      //         Accept: "application/vnd.github+json",
      //         Authorization: "token " + this.HugoFastghpToken,
      //       },
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response);
      //     this.loading = false;
      //     this.$notify({
      //       title: "发布成功",
      //       type: "success",
      //     });
      //     localStorage.removeItem("HugoFastallData");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     this.loading = false;
      //   });
    },

  },
  mounted() {
    this.bloglistdir = localStorage.getItem("bloglistdir");
    this.githubrepo = localStorage.getItem("HugoFastRepoName");
    this.HugoFastghpToken = localStorage.getItem("HugoFastghpToken");

    this.loadData();

  },
};
</script>
