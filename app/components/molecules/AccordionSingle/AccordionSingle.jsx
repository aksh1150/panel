import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AccordionSingle.scss';

export default function SimpleAccordion({ AccordionContents, Border, Separated }) {
  return (
    <>
      {AccordionContents.map((AccordionSingle) => (
        <>
          <Accordion className={`accordionSingle ${Border ? 'BorderColor' : null} ${Separated ? 'Separated' : null}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`accordion-content-${AccordionSingle.id}`}
              id={AccordionSingle.id}
              className="accordionSummary"
            >
              {AccordionSingle.summary}
            </AccordionSummary>
            <AccordionDetails className="accordionDetails">

              {AccordionSingle.details}

            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
}
