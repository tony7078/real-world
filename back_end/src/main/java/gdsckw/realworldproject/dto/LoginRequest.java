package gdsckw.realworldproject.dto;

public class LoginRequest {
    private LoginUserRequest user;
    public class LoginUserRequest{
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public LoginUserRequest getUser() {
        return user;
    }

    public void setUser(LoginUserRequest user) {
        this.user = user;
    }
}

