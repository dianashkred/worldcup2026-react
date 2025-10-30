import type { FC } from 'react';
import Button from '../Button/Button';


const HomeMainSection: FC = () => {
  return (
    Button({label:"Matches",to:'/matches'}),
    Button({label:"Teams",to:'/teams'}),
    Button({label:"Groups",to:'/groups'}),
    Button ({label:"Sign in",to:'/login'})
  )
};  
export default HomeMainSection;

  