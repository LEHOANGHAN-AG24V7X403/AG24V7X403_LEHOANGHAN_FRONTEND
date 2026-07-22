<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>

        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>

        <!-- Chọn Sở thích  -->
        <div class="form-group">
            <label class="d-block font-weight-bold">Sở thích:</label>
            <div class="mt-2">
                <div 
                    v-for="hobby in hobbyOptions" 
                    :key="hobby.id" 
                    class="form-check mb-2"
                >
                    <input 
                        type="checkbox" 
                        class="form-check-input" 
                        :id="hobby.id" 
                        :value="hobby.label" 
                        v-model="contactLocal.hobbies" 
                    />
                    <label :for="hobby.id" class="form-check-label ml-2">
                        {{ hobby.label }}
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });
        return {
            contactLocal: {
                ...this.contact,
                hobbies: this.contact.hobbies || []
            },
            contactFormSchema,
            hobbyOptions: [
                { id: "hobby1", label: "Thể thao" },
                { id: "hobby2", label: "Âm nhạc" },
                { id: "hobby3", label: "Du lịch" },
                { id: "hobby4", label: "Đọc sách" },
            ]
        };
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal._id || this.contactLocal.id);
        },
        Cancel() {
            const reply = window.confirm('You have unsaved changes! Do you want to leave?');
            if (!reply) {
                return false;
            }
            else this.$router.push({ name: "contactbook" });
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";

form {
    max-width: 450px;
    margin: 0 auto;
}
</style>