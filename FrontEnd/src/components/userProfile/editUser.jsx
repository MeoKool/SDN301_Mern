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
import { updateUser, getUserInfo } from "../../api/ApiConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

function EditProfile() {
  const [name, setName] = useState("");
  const [yob, setYob] = useState("");
  const [dataUser, setDataUser] = useState();
  const userLogin = sessionStorage.getItem("memberName");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !yob) {
      toast({
        variant: "destructive",
        title: "Vui lòng điền vào tất cả các trường",
      });
      return;
    } else if (name.length < 6 || /\d/.test(name)) {
      toast({
        variant: "destructive",
        title: "Tên phải chứa ít nhất 6 ký tự và không chứa số",
      });
      return;
    } else if (!/^\d{4}$/.test(yob)) {
      toast({
        variant: "destructive",
        title: "Năm sinh không hợp lệ",
      });
      return;
    }
    // try {
    //   const response = await updateUser(userLogin, { memberName, yob });
    //   if (response.status === 200) {
    //     toast({
    //       title: "Thành công, thông tin đã được cập nhật!✅",
    //     });
    //     navigate("/profile");
    //   }
    // } catch (err) {
    //   toast({
    //     title: "Lỗi❌",
    //     description: "Có lỗi xảy ra, vui lòng thử lại sau.",
    //   });
    // }
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await getUserInfo(userLogin);
        setDataUser(response.data);
        setName(response.data.name);
        setYob(response.data.yob);
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
              <CardTitle>Chỉnh sửa thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yob">Năm sinh</Label>
                <Input
                  id="yob"
                  type="text"
                  value={yob}
                  onChange={(e) => setYob(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-4">
                <Button onClick={handleSubmit}>Cập nhật</Button>
                <Link to="/profile" className="text-muted-foreground">
                  <Button variant="outline">Quay lại</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
