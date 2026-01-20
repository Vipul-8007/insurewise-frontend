import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($input: ApplicationInput!) {
    createApplication(input: $input) {
      businessName
      basePremium
      finalPremium
    }
  }
`;
