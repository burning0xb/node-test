export function chkAuth(application, allowAuth) {
  const auths = application.user && application.user.authorities ? application.user.authorities : '';
  let auth = '';
  for (auth in auths) {
    if (auth !== '') {
      if (auths[auth].authority === allowAuth) {
        return true;
      }
    }
  }
  return false;
}
