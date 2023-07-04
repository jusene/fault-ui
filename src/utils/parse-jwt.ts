export default function jwtTokenParse(token: string) {
  const strings = token.split(".");
  const userinfo = JSON.parse(
    decodeURIComponent(
      escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))
    )
  );

  return userinfo;
}
