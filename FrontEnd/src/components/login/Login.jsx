import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { SignInAccount } from "../../api/ApiConfig";

export default function LoginComponent() {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [memberError, setMemberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (!memberName) {
      setMemberError("Email is required");
      hasError = true;
    } else if (memberName.length < 5) {
      setMemberError("Member name must be at least 5 characters long");
      hasError = true;
    } else {
      setMemberError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      hasError = true;
    } else {
      setPasswordError("");
    }
    if (!hasError) {
      try {
        const response = await SignInAccount(memberName, password);
        if (response.status === 200) {
          toast({
            title: "Thành công, bạn đã đăng nhập!✅",
          });
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("id", response.data.id);
          sessionStorage.setItem("memberName", response.data.memberName);
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("admin", response.data.admin);

          navigate("/");
        }
      } catch (err) {
        if (err.response.status === 404) {
          toast({
            title: "Thất bại❌",
            description: "Sai tài khoản hoặc mật khẩu.",
          });
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Chào mừng trở lại</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130" }}
          >
            Vui lòng nhập tài khoản mật khẩu của bạn để đăng nhập.
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmitLogin}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Tên đăng nhập</Label>
                <Input
                  id="memberName"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                />
                {memberError && (
                  <div className="text-red-500 text-sm">{memberError}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="underline underline-offset-2">
            Chưa có tài khoản? đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
