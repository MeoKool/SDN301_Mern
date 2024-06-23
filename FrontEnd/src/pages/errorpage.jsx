export default function ErrorPage() {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <img
        style={{
          height: "50%",
          width: "50%",
        }}
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=1380&t=st=1708673312~exp=1708673912~hmac=a172d42af475a2e3f269e4184a4520468bfeba1319d4dbbe96551785bc5cc49a"
      />
      <p
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
        }}
      >
        Trang không tồn tại
      </p>
    </div>
  );
}
