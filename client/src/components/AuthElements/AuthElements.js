import styled from "styled-components";

export const BoxContainer = styled.div`
  max-width: 50vh;
  text-align: center;
  margin-top: 15%;
  margin-left: 35%;
  // margin-right: 25%;
  margin-bottom: 20%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 1);
  padding-top: 3%;
  // position: relative;
  overflow: hidden;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.6em;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const SubmitButton = styled.button`
  width: 80%;
  padding: 8px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  text-align: center;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #282c34;
  background: linear-gradient(
    58deg,
    #282c34 20%,
    #282c34 100%
  );
  &:hover {
    filter: brightness(1.4);
  }
`;