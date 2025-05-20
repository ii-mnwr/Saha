// @mui
import useMediaQuery from '@mui/material/useMediaQuery';

const useScreenSizes = () =>{
    const mobileMin = useMediaQuery('(min-width:320px)');
    const mobileMax = useMediaQuery('(max-width:320px)');
  
    const mobileMinM = useMediaQuery('(min-width:321px)');
    const mobileMaxM = useMediaQuery('(max-width:376px)');

    const mobileMinL = useMediaQuery('(min-width:377px)');
    const mobileMaxL = useMediaQuery('(max-width:480px)');

    const tabletMin = useMediaQuery('(min-width:481px');
    const tabletMax = useMediaQuery('(max-width:768px');
  
    const laptopMin = useMediaQuery('(min-width:769px');
    const laptopMax = useMediaQuery('(max-width:1024px');
  
    const desktopMin = useMediaQuery('(min-width:1028px');
    const desktopMax = useMediaQuery('(max-width:1440px');
  
    const isMobile = mobileMin && mobileMax;
    const isMobileM = mobileMinM && mobileMaxM;
    const isMobileL = mobileMinL && mobileMaxL;
    const isTablet = tabletMin && tabletMax;
    const isLaptop = laptopMin && laptopMax;
    const isLaptopL = desktopMin && desktopMax;
    
    return { isMobile, isTablet, isLaptop, isLaptopL, isMobileM, isMobileL };
}

export default useScreenSizes;