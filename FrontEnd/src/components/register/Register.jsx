import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { CreateMember } from "../../api/ApiConfig";
import { toast } from "../ui/use-toast";

export default function RegisterComponent() {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [yob, setYob] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Mật khẩu không khớp",
      });
      return;
    }
    try {
      const response = await CreateMember(memberName, password, name, yob);
      if (response.status === 200) {
        toast({
          title: "Đăng ký thành công vui lòng đăng nhập",
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 500) {
        toast({
          variant: "destructive",
          title: "Tài khoản này đã được đăng ký",
        });
      } else
        toast({
          variant: "destructive",
          title: "Thất bại",
          description: error.response.data,
        });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Đăng ký</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130" }}
          >
            Nhập thông tin của bạn để tạo tài khoản
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên thành viên</Label>
                <Input
                  id="username"
                  placeholder="Tên thành viên"
                  value={memberName}
                  required
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Họ tên</Label>
                  <Input
                    id="full-name"
                    placeholder="Tên của bạn"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth-year">Năm sinh</Label>
                  <Input
                    id="birth-year"
                    type="number"
                    min="1900"
                    max="2006"
                    value={yob}
                    required
                    onChange={(e) => setYob(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Quay lại
                </Link>
                <Button type="submit" className="flex-1">
                  Đăng ký
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
