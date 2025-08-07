import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';

const AuthRoutesLayout = () => {
  
const {isSignedIn} = useAuth();
if (isSignedIn) return <Redirect href={"/"} />;

  return <Stack screenOptions={{headerShown:false}}/>
}

export default AuthRoutesLayout