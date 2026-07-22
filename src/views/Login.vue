<template>
    <div class="login-page">
        <h4 class="text-center mb-4">Đăng Nhập</h4>
        <form @submit.prevent="handleLogin">
            <div class="form-group mb-3">
                <label for="username">Tên đăng nhập</label>
                <input 
                    type="text" 
                    id="username" 
                    class="form-control" 
                    v-model="username" 
                    required 
                    placeholder="Nhập tên đăng nhập..."
                />
            </div>
            <div class="form-group mb-3">
                <label for="password">Mật khẩu</label>
                <input 
                    type="password" 
                    id="password" 
                    class="form-control" 
                    v-model="password" 
                    required 
                    placeholder="Nhập mật khẩu..."
                />
            </div>
            <p class="text-danger text-center mb-3" v-if="errorMessage">{{ errorMessage }}</p>
            <div class="form-group text-center">
                <button class="btn btn-primary btn-block w-100">Đăng nhập</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        handleLogin() {
            if (this.username === "admin" && this.password === "123456") {
                // Lưu key "user" trùng khớp với kiểm tra bên router/index.js
                localStorage.setItem("user", JSON.stringify({ username: this.username }));
                
                // Chuyển hướng lập tức sang trang danh bạ
                this.$router.push({ name: "contactbook" });
            } else {
                this.errorMessage = "Tài khoản hoặc mật khẩu không đúng! (Gợi ý: admin / 123456)";
            }
        },
    },
};
</script>

<style scoped>
.login-page {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>