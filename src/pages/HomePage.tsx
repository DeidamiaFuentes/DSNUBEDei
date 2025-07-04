import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import { useFirebaseUser } from "../hooks/useFirebaseUser";
import { useEffect, useState } from "react";

export default function HomePage(){
   const navigate = useNavigate();
  const { user, logout } = useFirebaseUser();
  const [userHasGoogle, setUserHasGoogle] = useState(false);
  const [userHasPassword, setUserHasPassword] = useState(false);
  const [userHasFacebook, setUserHasFacebook] = useState(false);
  const { linkWithFacebook } = useFirebaseUser();
  
  useEffect(() => {
    if (!user) {
      return;
    }
    const hasGoogle = user.providerData.some(
      (profile) => profile.providerId === "google.com"
    );

    setUserHasGoogle(hasGoogle);
    
    const hasPassword = user.providerData.some(
      (profile) => profile.providerId === "password"
    );
    
    setUserHasPassword(hasPassword);

    const hasFacebook = user.providerData.some(
      (profile) => profile.providerId === "facebook.com"
    );
    
    setUserHasFacebook(hasFacebook);
  }, [user]);
  
  const onAddEmailSignInClicked = () => {
    navigate("/linkpassword");
  };
  
  const onAddFacebookSignInClicked = () => {
    linkWithFacebook();
  };
  
  return (
    <>
      <Card>
        <div>
          <h1>Welcome to the dashboard {user?.displayName}!</h1>
          <div>
            <b>Your email is:</b> {user?.email}
          </div>

          <div>
            Add additional login methods:
            {!userHasGoogle && (
              <div>
                <Button variant="danger" className="mt-3" onClick={() => {}}>
                  Add google Sign In
                </Button>
              </div>
            )}

            {!userHasPassword && (
              <div>
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={onAddEmailSignInClicked}
                >
                  Add email Sign In
                </Button>
              </div>
            )}
            
            {!userHasFacebook && (
              <div>
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={onAddFacebookSignInClicked}
                >
                  Add Facebook Sign In
                </Button>
              </div>
            )}

          </div>
        </div>

        <div>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </div>
      </Card>
    </>
  )
}
