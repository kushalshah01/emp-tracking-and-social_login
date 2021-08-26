import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { AppConstant } from '../app.constant';


let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(AppConstant.SOCIAL_LOGIN.google)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(AppConstant.SOCIAL_LOGIN.facebook)
    }
]);

export function provideConfig() {
    return config;
}