import "./FlightCard.css";
import { DateTime } from "luxon";

export default function FlightCard({ ticket }) {
  const legOneDuration = ticket.flight.legs[0].duration;
  const legTwoDuration = ticket.flight.legs[1].duration;

  function handeMonthAndDay(date) {
    return (
      <div className="monthAndDay">
        {DateTime.fromISO(date).toLocaleString({ day: "2-digit" })}{" "}
        {DateTime.fromISO(date).toLocaleString({ month: "short" })}{" "}
        {DateTime.fromISO(date).toLocaleString({ weekday: "short" })}
      </div>
    );
  }

  function handleTime(date) {
    return (
      <div className="time">
        {DateTime.fromISO(date).toLocaleString({
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    );
  }

  return (
    <>
      <div className="firstLeg">
        <div className="priceBlock">
          <div className="priceContainer">
            <p className="price">
              {Math.floor(ticket.flight.price.totalFeeAndTaxes.amount)} ₽
            </p>
            <p className="priceDescription">
              Стоимость для одного взрослого пассажира
            </p>
          </div>
        </div>
        <div className="airports">
          {ticket.flight.legs[0].segments[0].departureCity.caption},{" "}
          {ticket.flight.legs[0].segments[0].departureAirport.caption}
          <div className="airportUID">
            ({ticket.flight.legs[0].segments[0].departureAirport.uid})
          </div>
          <img className="arrow" src="src\assets\arrow.svg"></img>{" "}
          {
            ticket.flight.legs[0].segments[
              ticket.flight.legs[0].segments.length - 1
            ].arrivalAirport.caption
          }
          <div className="airportUID">
            (
            {
              ticket.flight.legs[0].segments[
                ticket.flight.legs[0].segments.length - 1
              ].arrivalAirport.uid
            }
            )
          </div>
        </div>
        <div className="datesAndDuration">
          <div className="date">
            {handleTime(ticket.flight.legs[0].segments[0].departureDate)}

            {handeMonthAndDay(ticket.flight.legs[0].segments[0].departureDate)}
          </div>
          <div className="duration">
            <img className="clock" src="src\assets\clock.svg"></img>
            {Math.floor(legOneDuration / 60)} ч {legOneDuration % 60} мин
          </div>
          <div className="date">
            {handeMonthAndDay(
              ticket.flight.legs[0].segments[
                ticket.flight.legs[0].segments.length - 1
              ].arrivalDate
            )}

            {handleTime(
              ticket.flight.legs[0].segments[
                ticket.flight.legs[0].segments.length - 1
              ].arrivalDate
            )}
          </div>
        </div>
        {ticket.flight.legs[0].segments.length === 2 ? (
          <div className="transitLine">
            <span>1 пересадка</span>
          </div>
        ) : (
          <div className="directLine"></div>
        )}
        <div className="carrier">
          Рейс выполняет: {ticket.flight.legs[0].segments[0].airline.caption}
        </div>
      </div>
      <div className="airports">
        {ticket.flight.legs[1].segments[0].departureAirport.caption}
        <div className="airportUID">
          ({ticket.flight.legs[1].segments[0].departureAirport.uid})
        </div>
        <img className="arrow" src="src\assets\arrow.svg"></img>{" "}
        {
          ticket.flight.legs[1].segments[
            ticket.flight.legs[1].segments.length - 1
          ].arrivalCity.caption
        }
        ,{" "}
        {
          ticket.flight.legs[1].segments[
            ticket.flight.legs[1].segments.length - 1
          ].arrivalAirport.caption
        }
        <div className="airportUID">
          (
          {
            ticket.flight.legs[1].segments[
              ticket.flight.legs[1].segments.length - 1
            ].arrivalAirport.uid
          }
          )
        </div>
      </div>
      <div className="datesAndDuration">
        <div className="date">
          {handleTime(ticket.flight.legs[1].segments[0].departureDate)}

          {handeMonthAndDay(ticket.flight.legs[1].segments[0].departureDate)}
        </div>
        <div className="duration">
          <img className="clock" src="src\assets\clock.svg"></img>
          {Math.floor(legTwoDuration / 60)} ч {legTwoDuration % 60} мин
        </div>
        <div className="date">
          {handeMonthAndDay(
            ticket.flight.legs[1].segments[
              ticket.flight.legs[1].segments.length - 1
            ].arrivalDate
          )}

          {handleTime(
            ticket.flight.legs[1].segments[
              ticket.flight.legs[1].segments.length - 1
            ].arrivalDate
          )}
        </div>
      </div>
      {ticket.flight.legs[1].segments.length === 2 ? (
        <div className="transitLine">
          <span>1 пересадка</span>
        </div>
      ) : (
        <div className="directLine"></div>
      )}
      <div className="carrier">
        Рейс выполняет: {ticket.flight.legs[1].segments[0].airline.caption}
      </div>
      <div className="bottomBlock">
        <p>ВЫБРАТЬ</p>
      </div>
    </>
  );
}
