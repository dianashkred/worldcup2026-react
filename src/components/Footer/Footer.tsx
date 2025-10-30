import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoIcon from '../../assets/icons/logo_fifa.png';
import instagramIcon from '../../assets/icons/social-instagram.svg';
import twitterIcon from '../../assets/icons/social-twitter.svg';
import youtubeIcon from '../../assets/icons/social-youtube.svg';
import googlePlayIcon from '../../assets/icons/google_play_logo.svg';
import appStoreIcon from '../../assets/icons/apple_store_logo.svg';

const Footer: FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogoSection>
          <FooterLogo src={logoIcon} alt="FIFA Logo" />
        </FooterLogoSection>

        <FooterLinksSection>
          <FooterLinksGroup>
            <FooterHeading>About</FooterHeading>
            <FooterLink to="#">Host Countries</FooterLink>
            <FooterLink to="#">Venues</FooterLink>
            <FooterLink to="#">History</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Matches & Tickets</FooterHeading>
            <FooterLink to="#">Match Schedule</FooterLink>
            <FooterLink to="#">Ticket Information</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Fan Zone</FooterHeading>
            <FooterLink to="#">News</FooterLink>
            <FooterLink to="#">Photos</FooterLink>
            <FooterLink to="#">Videos</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Info</FooterHeading>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/order">Order</FooterLink>
            <FooterLink to="#">FAQ</FooterLink>
            <FooterLink to="#">Contact</FooterLink>
          </FooterLinksGroup>

          <FooterLinksGroup>
            <FooterHeading>Legal</FooterHeading>
            <FooterLink to="#">Privacy Policy</FooterLink>
            <FooterLink to="#">Terms Of Service</FooterLink>
            <FooterLink to="#">Manage Cookie Preferences</FooterLink>
          </FooterLinksGroup>
        </FooterLinksSection>
      </FooterContent>

      <FooterBottom>
        <FooterBottomContent>
        <SocialIcons>
          <SocialIconLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={instagramIcon} alt="Instagram" />
          </SocialIconLink>
          <SocialIconLink href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={twitterIcon} alt="Twitter" />
          </SocialIconLink>
          <SocialIconLink href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon src={youtubeIcon} alt="YouTube" />
          </SocialIconLink>
        </SocialIcons>

        <AppDownload>
          <AppText>Download the FIFA App today</AppText>
          <AppButton href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <AppIcon src={googlePlayIcon} alt="Google Play" />
          </AppButton>
          <AppButton href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <AppIcon src={appStoreIcon} alt="App Store" />
          </AppButton>
        </AppDownload>
        </FooterBottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;


const FooterContainer = styled.footer`
  width: 100%;
  padding: 5rem 0 2rem 0;
  background-color: #000;
  color: #fff;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;
`;

const FooterLogoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FooterLogo = styled.img`
  height: 50px;
  margin-bottom: 2rem;
`;

const FooterLinksSection = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4rem;
`;

const FooterLinksGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h4`
  color: #fff;
  font-size: 14px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const FooterLink = styled(Link)`
  color: #ddd;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 0.7rem;
  transition: color 0.2s;

  &:hover {
    color: #4b57db;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.6);  
  margin-top: 4rem;
  padding-top: 2rem;
  width: 100%;             
`;

const FooterBottomContent = styled.div`
  max-width: 1200px;       
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const SocialIconLink = styled.a`
  width: 38px;
  height: 38px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const SocialIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const AppDownload = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-end;    
  text-align: right;
`;

const AppText = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 0;
`;

const AppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const AppIcon = styled.img`
  height: 120px;
  width: auto;
  display: block;
  transition: transform 0.3s ease;
`;

