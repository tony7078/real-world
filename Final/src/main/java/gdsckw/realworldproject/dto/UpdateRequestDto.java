package gdsckw.realworldproject.dto;

public class UpdateRequestDto {
    private UpdateRequest user;

    public class UpdateRequest{
        private String email;
        private String bio;
        private String image;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getBio() {
            return bio;
        }

        public void setBio(String bio) {
            this.bio = bio;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }

    public UpdateRequest getUser() {
        return user;
    }

    public void setUser(UpdateRequest user) {
        this.user = user;
    }
}
