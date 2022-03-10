import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Styles/styles.css";
import UnderConstruction from "../UnderConstruction/UnderConstruction";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardDetail(props) {
  console.log(props.itineraries);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {props.itineraries.length !== 0 ? (
        props.itineraries.map((info) => (
          <div className="conteinerItinerarios" key={info._id}>
            <Card className="itinerario" sx={{ maxWidth: 1300 }}>
              <div className="conteinerimguser">
                <img className="imgitinerario" src={info.userimage} />
              </div>
              <CardHeader title={info.username} />
              <div className="infoitinerario">
                <div className="tituloeimgitinerario">
                  <div>
                    <h2>{info.name}</h2>
                    <h3>Price: {"💵".repeat(parseInt(info.price))}</h3>
                    <h3>Duration: {info.duration} </h3>
                    <h3>{info.hashtag}</h3>
                  </div>
                  <div>
                    <img className="imgbandera" src={info.flag} />
                  </div>
                </div>
                <div className="imgitinerariodetalle">
                  <img className="imgitinerariodetalle" src={info.image} />
                </div>
              </div>
              <Typography
                className="infoitinerario"
                variant="body3"
                color="text.secondary"
              ></Typography>
              <CardContent></CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography>UNDER CONSTRUCTION.</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        ))
      ) : (
        <UnderConstruction />
      )}
    </>
  );
}
