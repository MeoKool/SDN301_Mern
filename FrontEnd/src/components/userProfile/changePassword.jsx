import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SideBarProfile from "./sideBar";
import { changePassword, getUserInfo } from "../../api/ApiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [dataUser, setDataUser] = useState();
  const userLogin = sessionStorage.getItem("memberName");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (!password) {
      toast({
        variant: "destructive",
        title: "Vui lòng điền vào mật khẩu cũ",
      });
      hasError = true;
    } else if (!newPassword) {
      toast({
        variant: "destructive",
        title: "Vui lòng điền vào mật khẩu mới",
      });
      hasError = true;
    } else if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
      hasError = true;
    } else if (!confirmNewPassword) {
      toast({
        variant: "destructive",
        title: "Vui lòng xác nhận mật khẩu mới",
      });
      hasError = true;
    } else if (newPassword !== confirmNewPassword) {
      toast({
        variant: "destructive",
        title: "Mật khẩu mới không trùng nhau ",
      });
      return;
    }
    if (!hasError) {
      try {
        const response = await changePassword(userLogin, password, newPassword);
        if (response.status === 200) {
          toast({
            title: "Thành công, mật khẩu đã được thay đổi!✅",
          });
          navigate("/profile");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast({
            variant: "destructive",
            title: "Thất bại",
            description: err.response.data.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Lỗi",
            description: "Có lỗi xảy ra, vui lòng thử lại sau.",
          });
        }
      }
    }
  };
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await getUserInfo(userLogin);
        setDataUser(response.data);
        setIsDataLoaded(true);
      } catch (error) {
        setIsDataLoaded(false);
        console.log(error);
      }
    };
    fetchDataUser();
  }, []);
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full max-w-7xl mx-auto">
      <SideBarProfile dataUser={dataUser} />
      <div className="w-full bg-background rounded-2xl overflow-hidden shadow-lg ml-3">
        <div className="border-t border-muted/20 px-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
              <CardDescription>
                Cập nhật mật khẩu của bạn để tăng tính bảo mật.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu cũ</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Cập nhật</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
