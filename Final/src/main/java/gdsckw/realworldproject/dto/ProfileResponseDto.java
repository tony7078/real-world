package gdsckw.realworldproject.dto;

public class ProfileResponseDto {
    private ProfileDto profile;

    public ProfileResponseDto(ProfileDto profile) {
        this.profile = profile;
    }

    public static class ProfileDto {
        private String username;
        private String bio;
        private String image;
        private boolean following;

        public ProfileDto(String username, String bio, String image, boolean following) {
            this.username = username;
            this.bio = bio;
            this.image = image;
            this.following = following;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
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

        public boolean isFollowing() {
            return following;
        }

        public void setFollowing(boolean following) {
            this.following = following;
        }
    }

    public ProfileDto getProfile() {
        return profile;
    }

    public void setProfile(ProfileDto profile) {
        this.profile = profile;
    }
}
