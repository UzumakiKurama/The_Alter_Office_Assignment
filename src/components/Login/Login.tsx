import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import '../../../public/logos/google.png'
import './styles.css';

const Login = ({getUser} : {
    getUser : (res: CredentialResponse) => void,
}) => {

    const onError = () => {
        console.log('Login Failed');
    }
  return (
    <div className='login_container'>
        <div className="login_googlelogin">
            <img
                height={100}
                width={100}
                src='/logos/google.png'
                alt='goggle-logo'
                />
            <GoogleLogin
                theme='filled_blue'
                size='large' 
                onSuccess={getUser}
                onError={onError} />
        </div>
    </div>
  )
}

export default Login