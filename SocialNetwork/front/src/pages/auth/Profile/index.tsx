import { useOutletContext } from "react-router-dom";
import type { Context, Posts } from "../../../helpers/types";
import { ProfileDetails } from "./ProfileDetails";
import { AboutSection } from "./AboutSection";
import { PostsSection } from "./PostsSection";



export const Profile = () => {
  
  
  
  return (
    <div className="space-y-8">
      
      <ProfileDetails/>
      <AboutSection/>
      <PostsSection/>
      
      
    </div>
  );
};
