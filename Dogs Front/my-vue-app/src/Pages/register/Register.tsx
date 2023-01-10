import React from 'react'
import { Container, Box} from '@mui/material'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormRegister from './form/FormRegister';
import { form } from './form/controlForm';
import ListImage from './form/imagenList/ListImage';
import { useFetchRegisterMutation } from '../../feactures/user/UserSlice';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const steps = ['Your Account Data', 'Favorite types of dogs', 'Finish'];


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}



let initialState = {
    name : '' ,
    password : '', 
    confirmPassword : '',
    email : ''
}
const Register = () => {
    const [error, setError] = React.useState<form>(initialState)
    const [input, setInput] = React.useState<form>(initialState)
    const [registerUser, resultRegister] = useFetchRegisterMutation()
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
      [k: number]: boolean;
    }>({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step: number) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();

      if (completedSteps() === totalSteps() - 1) {
        registerUser(input)
      }
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
   console.log(input)
  return (
    <Container>
           
        <Box sx={{ display: 'flex' , flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
        <Typography variant="h3" fontWeight='bold' gutterBottom>Register</Typography> 
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', background: '#fff', borderRadius: '6px' , border: '2px solid #ECECEC'}}>
          <Box sx={{  width: '100%', margin: '40px' }}>
      <Stepper   nonLinear activeStep={activeStep}  alternativeLabel connector={<ColorlibConnector />} sx={{marginBottom: '10px'}} >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
             <StepLabel StepIconComponent={ColorlibStepIcon}  onClick={handleStep(index)}>{label}</StepLabel>
            
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            { resultRegister.isError === false && <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Thanks for signing up, we'll send you an email so you can <strong>activate your account </strong>
             </Alert>
              
             
            </Box>}
          </React.Fragment>
        ) : (
          <React.Fragment>
            
           

           
            { activeStep === 0 && <Box width='100%' display='flex' justifyContent='center' marginBottom='50px'   >
           
                      <FormRegister error={error} setError={setError} input={input} setInput={setInput}/>
              </Box>}

              { activeStep === 1 && <Box width='100%' display='flex' justifyContent='center'  >
                      <ListImage/>
              </Box>}

              { activeStep === 2 && <Box width='100%' display='flex' justifyContent='center'  >
                      
              </Box>}
             
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
              variant="outlined"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button  disabled={Object.values(error).join('').length > 0 ? true : false} variant="contained"  onClick={handleNext} sx={{ mr: 1 , bgcolor: '#111'}}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (

                  <Button disabled={Object.values(error).join('').length > 0 ? true : false} variant="contained" sx={{backgroundColor: '#f09f57', backgroundImage: 'linear-gradient(90deg, #f09f57 0%, #f71c67 100%)' }} onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
      </Box>  
    </Box>
    
        </Box>
    </Container>
  )
}

export default Register 