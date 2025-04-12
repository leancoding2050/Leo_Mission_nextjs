import Teacher_Login_Form from "@/components/Form/teacher_login_form"
import ForgotPassword from "../forgot-password/page"
import Link from "next/link"

const TeacherLoginPage = () => {
    return(
        <>
                    <div>
                <Link href="/">
                    返回首页
                </Link>
            </div>
            <Teacher_Login_Form />
            <Link href="/forgot-password">
            忘记密码
            </Link>
        </>
    )
}

export default TeacherLoginPage