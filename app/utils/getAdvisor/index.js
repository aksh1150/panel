import axios from 'axios';

import API_URL from '../apiUrl/index';
import authHeader from '../jwt/index';

const AdvisorOption = [];

const GetAdvisor = () => {
  axios
    .get(`${API_URL}advisor/getAdvisors`, {
      headers: authHeader(),
    })
    .then(
      async advisors => {
        const advisorObject = advisors.data;
        for (const property in advisorObject) {
          AdvisorOption.push({
            value: advisorObject[property].id,
            label: `${advisorObject[property].firstname} ${
              advisorObject[property].lastname
            } - ${advisorObject[property].mobile_phone}`,
          });
        }
      },
      getError => {
        console.log(getError);
      },
    );
};
GetAdvisor();
export default AdvisorOption;
