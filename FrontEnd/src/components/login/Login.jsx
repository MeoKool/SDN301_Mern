import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginMember } from "../../api/login";

export default function LoginComponent() {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [memberError, setMemberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
        const response = await loginMember(memberName, password);
        if (response.status === 200) {
          console.log(response.data);
          navigate("/");
        } else {
          // Xử lý các trường hợp khác
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#83B4FF] to-[#1A2130]">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130" }}
          >
            Enter your account and password to access your account.
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Member Name</Label>
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
                <Label htmlFor="password">Password</Label>
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
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="flex justify-between text-sm">
          <Link to="/register" className="underline underline-offset-2">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
