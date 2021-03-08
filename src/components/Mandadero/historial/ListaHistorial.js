import React, { useState } from "react";
import {
  Card,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";

export const ListaHistorial = ({ envios }) => {
  console.log(envios);
  const setDireccion = (direccion) => {
    if (direccion) {
      const newDir = direccion.split(",");
      return `${newDir[0]},${newDir[1]}`;
    }
  };

  const [open, setOpen] = useState(false);
  const [selectEnvios, setSelectEnvios] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (idx) => {
    setOpen(true);
    setSelectEnvios(envios[idx]);
  };

  return (
    <>
      {envios.map((envio, idx) => (
        <Card key={envio.id} style={{ margin: "20px 0" }}>
          <CardContent>
            <p className="historial__clave">Clave de envio {envio.id}</p>
            <p className="historial__fecha">{envio.fecha_envio}</p>
            <div className="historial__description">
              <div className="timeline">
                <ul>
                  <span></span>
                  <li>
                    <p> {setDireccion(envio.origen)}</p>
                  </li>
                  <li>
                    <p> {setDireccion(envio.destino)}</p>
                  </li>
                </ul>
              </div>
              <div className="total">
                <p>${envio.total}.00</p>
                <p className="historial__kg">{envio.peso_envio} kg.</p>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                handleOpen(idx);
              }}
              size="small"
            >
              Ver detalles
            </Button>
          </CardActions>
        </Card>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Detalles"}</DialogTitle>
        <DialogContent>
          <Card style={{ maxWidth: "350px" }}>
            <CardMedia
              component="img"
              alt="imagen de envio"
              image={selectEnvios.urlImg}
            />
            <CardContent>
              <div className="historial__direccion">
                <h3>Direccion</h3>
                <p>{selectEnvios.direccion} cdklwncdwnckdwlcn</p>
              </div>
              <div className="historial__notas">
                <h3>Notas</h3>
                <p>{selectEnvios.notas} lxcndwiocndwkcnwecpoknwdkcew</p>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
