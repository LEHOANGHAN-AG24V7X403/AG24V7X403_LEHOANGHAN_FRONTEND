<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>

      <!-- Khi chưa đăng nhập: Hiển thị nút Đăng nhập -->
      <li v-if="!isLoggedIn" class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link">
          Đăng nhập
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </li>

      <!-- Khi đã đăng nhập: Hiển thị nút Đăng xuất -->
      <li v-else class="nav-item">
        <a href="#" class="nav-link" @click.prevent="logout">
          Đăng xuất
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
  },
  // Tự động kiểm tra lại trạng thái mỗi khi chuyển route
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("user");
    },
    logout() {
      // Xóa dữ liệu đăng nhập và đưa người dùng về lại trang login
      localStorage.removeItem("user");
      this.isLoggedIn = false;
      this.$router.push({ name: "login" });
    },
  },
};
</script>