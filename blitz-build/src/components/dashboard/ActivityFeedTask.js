import React,{useState,useEffect, useRef, useContext} from "react";
import styled, { css } from "styled-components";
import MeatBallsDrop from "../tasks/MeatBallsDrop"
import projectContext from "../../contexts/projects/ProjectContext";
import { NavLink } from "react-router-dom";



function ActivityFeedTask({ item, children, props }) {
  

  const { projects } = useContext(projectContext);


   const projectID = []

  const checkProjectID = () => projects.map( project =>{
    if (project.id === item.project_id) {
        projectID.push(project.id)
    }
  }
    )

    checkProjectID()

  const TaskAddress = projects.map(project => {
    if (project.id === item.project_id) {
      return project.street_address
    }
    
  })
  const TaskProjectName = projects.map(project => {
      if (project.id === item.project_id) {
        return project.project_name
      }
    })
  const today = new window.Date().toISOString().slice(0, 10);
// This value is hardcoded now because the server don't send back a date
// It should be {item.due_date}
  const project_date = item.due_date;
   
  function DateCalc(today, project_date) {
    if (today === project_date) {
      return "Pending";
    } else if (today > project_date) {
      return "Overdue";
    } else if (today < project_date) {
      return "Upcoming";
    }
  }

  const checkCondition = () => {
    if(item.isComplete === true) {
      return (
        <TitleText>Completed Task</TitleText>
      )}
      else {
        return (
          <TitleText>  Added Task </TitleText>
        )
      }
    
  }
  const status = DateCalc(today, item);

  const todayDate = new window.Date(today);
  const projectDate = new window.Date(item.due_date);
  const oneDay = 24 * 60 * 60 * 1000;

  const diffDays = Math.round(Math.abs((todayDate - item.due_date) / oneDay));

 console.log('project id on activity feed :', projectID)
  return (
    <Container>  
       <NavLink to={`/projects/${projectID}`} style = {NavLinkStyle}>
  
     
      <InnerContainer>
      
        
          {checkCondition()}
 <NameText>{item.task_name}  </NameText>

      <Spacer> / </Spacer>

      <AddressText> {TaskAddress} </AddressText>
      <ProjectName>{TaskProjectName} </ProjectName> 
     
        </InnerContainer>
       
     
       </NavLink>
    </Container>



  );
   
}

export default ActivityFeedTask;

const NavLinkStyle = {
  textDecoration: 'none',
  display: 'flex',
  height: '100%',
  width:'100%',
 

 
} ;
const Spacer = styled.div`
display: flex;
flex-direction: column;
width: 2%;

`
const Container = styled.div`
  width: 100%;
  height: 100px;
  background: white;
  padding: 16px 32px 32px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  :nth-child(odd) {
    background: #fbfaf9;
  }
`;

const InnerContainer = styled.div`
width: 98%;
display: flex;
justify-content: space-around;
align-items: center;
cursor: pointer;

  p {
    font-weight: 500;
  font-size: 14px;
    line-height: 16px;
    font-family: "Roboto";
    color: #3f3a36;
  }
`;

const TitleText = styled.p`
  display: flex;
  flex-direction: column;
  width: 15%;
  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto";
  margin-bottom: 8px;
`;

const NameText = styled.p`
  display: flex;
  flex-direction: column;
  width: 25%;
  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto";
  color: #3f3a36;
  margin-bottom: 8px;
 
`;
const AddressText = styled.p`
display: flex;
flex-direction: column;
width: 25%;
  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto";
  color: #3f3a36;
  margin-bottom: 8px;
`;
const ProjectName = styled.p`
width: 10%;
overflow-wrap: normal;
display: flex;
justify-content: end;

  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto";
  color: #3f3a36;
  margin-bottom: 8px;
`;

const DueDate = styled.div``;

const Date = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #3f3a36;
  font-family: "Roboto";
  font-weight: 500;
`;

const Status = styled.div`
  padding: 5px 16px 3px;
  background-color: grey;
  color: black;
  border-radius: 30px;

  p {
    font-family: "Roboto";
    font-size: 14px;
    line-height: 16px;
  }

  ${props =>
    props.status === "Overdue" &&
    css`
      background-color: #ffbfbf;
      color: #9c0e0e;
    `};

  ${props =>
    props.status === "Pending" &&
    css`
      background-color: #fff3b3;
      color: #8b4708;
    `};

  ${props =>
    props.status === "Upcoming" &&
    css`
      background-color: #d2fac4;
      color: #326021;
    `};
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
`;
