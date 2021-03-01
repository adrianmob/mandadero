import React from "react";
import { Card, CardContent } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@material-ui/lab";

export const ListaHistorial = ({ envios }) => {
  return (
    <>
      {envios.map((envio) => (
        <Card key={envio.id} style={{ margin: "20px 0" }}>
          <CardContent>
            <p>Clave de envio {envio.id}</p>
            <div>
              <div>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{envio.destino}</TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>{envio.origen}</TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
              <div>
                <p>${envio.total}.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
