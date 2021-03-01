import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@material-ui/core";
import CommuteIcon from "@material-ui/icons/Commute";

export const ListaViaje = ({
  viajes,
  setDireccion,
  handleClick,
  handleSelectViaje,
}) => {
  return (
    <List style={{ width: "100%" }}>
      {viajes.map((viaje) => (
        <div style={{ margin: "10px 0" }} key={viaje.id}>
          <ListItem
            button
            style={{ margin: "15px 0" }}
            onClick={() => handleSelectViaje(viaje.id)}
          >
            <ListItemAvatar>
              <Avatar>
                <CommuteIcon />
              </Avatar>
            </ListItemAvatar>
            <div style={{ display: "flex", margin: "10px" }}>
              <div style={{ margin: "0 8px" }}>
                <p style={{ margin: "0 0 5px 0" }}>
                  {viaje.horaViaje} hrs {setDireccion(viaje.salida)}
                </p>
                <p style={{ margin: "5px 0 0 0" }}>
                  {viaje.hora_llegada} hrs {setDireccion(viaje.destino)}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <p>${viaje.precio}</p>
              </div>
            </div>
          </ListItem>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Chip
              style={{ margin: "0 10px" }}
              onClick={(event) => handleClick(event, viaje.notas)}
              label="Ver detalles"
              variant="outlined"
            />
            <Chip
              style={{ borderColor: "blue" }}
              label={`Quedan ${viaje.equipajePeso}kg`}
              variant="outlined"
            />
          </div>
        </div>
      ))}
    </List>
  );
};
