import "./App.css";
import FlightCard from "./FlightCard";
import flights from "./flights.json";
import { useState, useEffect } from "react";

function App() {
  const initialTickets = flights.result.flights.slice(0, 2);
  const [tickets, setTickets] = useState(initialTickets);
  const [ticketsShown, setTicketsShown] = useState(2);
  const [sortBy, setSortBy] = useState("byLowest");
  const [filters, setFilters] = useState({
    oneTransit: false,
    direct: false,
    carriers: {
      AF: false,
      KL: false,
      SU1: false,
      TK: false,
      AY: false,
      BT: false,
      AZ: false,
      PC: false,
      SN: false,
      LO: false,
    },
  });
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [minPrice, setMinPrice] = useState(0);

  function filterFlights(data) {
    let filtered = data.filter(
      (flight) =>
        Number(flight.flight.price.totalFeeAndTaxes.amount) <= maxPrice
    );

    filtered = filtered.filter(
      (flight) =>
        Number(flight.flight.price.totalFeeAndTaxes.amount) >= minPrice
    );

    if (Object.values(filters.carriers).includes(true)) {
      filtered = filtered.filter(
        (elem) =>
          filters.carriers[elem.flight.legs[0].segments[0].airline.uid] ||
          filters.carriers[elem.flight.legs[1].segments[0].airline.uid]
      );
    }

    if (filters.oneTransit) {
      filtered = filtered.filter(
        (elem) =>
          elem.flight.legs[0].segments.length +
            elem.flight.legs[1].segments.length ===
          3
      );
    }

    if (filters.direct) {
      filtered = filtered.filter(
        (elem) =>
          elem.flight.legs[0].segments.length +
            elem.flight.legs[1].segments.length ===
          2
      );
    }

    if (sortBy === "byLowest") {
      filtered = filtered.sort(
        (a, b) =>
          Number(a.flight.price.totalFeeAndTaxes.amount) -
          Number(b.flight.price.totalFeeAndTaxes.amount)
      );
    }
    if (sortBy === "byHighest") {
      filtered = filtered.sort(
        (a, b) =>
          Number(b.flight.price.totalFeeAndTaxes.amount) -
          Number(a.flight.price.totalFeeAndTaxes.amount)
      );
    }
    if (sortBy === "byTime") {
      filtered = filtered.sort((a, b) => {
        const sumA = a.flight.legs[0].duration + a.flight.legs[1].duration;
        const sumB = b.flight.legs[0].duration + b.flight.legs[1].duration;
        return sumA - sumB;
      });
    }
    return filtered;
  }

  function handleSortingMethod(sortingName) {
    setSortBy(sortingName);
  }

  function handleFilterToggle(filterName) {
    if (Object.keys(filters).includes(filterName)) {
      setFilters((prevState) => ({
        ...prevState,
        [filterName]: !prevState[filterName],
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        carriers: {
          ...prevState.carriers,
          [filterName]: !prevState.carriers[filterName],
        },
      }));
    }
  }

  function applyFilters() {
    const filtteredFlights = filterFlights(flights.result.flights);
    setTickets(filtteredFlights.slice(0, ticketsShown));
  }

  function handleAddMore() {
    const filtteredFlights = filterFlights(flights.result.flights);
    const extraItems = filtteredFlights.slice(ticketsShown, ticketsShown + 2);
    setTickets((items) => [...items, ...extraItems]);
    setTicketsShown(ticketsShown + 2);
  }

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, maxPrice, minPrice]);

  return (
    <div className="container">
      <div className="filtersAndSortings">
        <div className="topGreyBlock"></div>
        <div className="sortings">
          <p style={{ fontWeight: "bold" }}>Сортировать</p>
          <label>
            <input
              type="radio"
              name="sortings"
              onClick={() => handleSortingMethod("byLowest")}
            ></input>
            - по возрастанию цены
          </label>
          <label>
            <input
              type="radio"
              name="sortings"
              onClick={() => handleSortingMethod("byHighest")}
            ></input>
            - по убыванию цены
          </label>
          <label>
            <input
              type="radio"
              name="sortings"
              onClick={() => handleSortingMethod("byTime")}
            ></input>
            - по времени в пути
          </label>
        </div>
        <div className="transitFilters">
          <p style={{ fontWeight: "bold" }}>Фильтровать</p>
          <label>
            <input
              type="checkbox"
              name="transits"
              onChange={() => handleFilterToggle("oneTransit")}
            ></input>
            - 1 пересадка
          </label>
          <label>
            <input
              type="checkbox"
              name="transits"
              onChange={() => handleFilterToggle("direct")}
            ></input>
            - без пересадок
          </label>
        </div>
        <div className="priceFilters">
          <p style={{ fontWeight: "bold" }}>Цена</p>
          <label>
            От
            <input
              type="number"
              style={{ margin: "0.5rem" }}
              onBlur={(e) =>
                e.target.value ? setMinPrice(e.target.value) : setMinPrice(0)
              }
            ></input>
          </label>
          <label>
            До
            <input
              type="number"
              style={{ margin: "0.5rem" }}
              onBlur={(e) =>
                e.target.value
                  ? setMaxPrice(e.target.value)
                  : setMaxPrice(Infinity)
              }
            ></input>
          </label>
        </div>
        <div className="carrierFilters">
          <p style={{ fontWeight: "bold" }}>Авиакомпании</p>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("LO")}
            ></input>
            LOT Polish Airlines
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("SU1")}
            ></input>
            Аэрофлот - российские авиалинии
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("AF")}
            ></input>
            Air France
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("KL")}
            ></input>
            KLM
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("TK")}
            ></input>
            TURK HAVA YOLLARI A.O.
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("AY")}
            ></input>
            Finnair Oyj{" "}
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("BT")}
            ></input>
            Air Baltic Corporation A/S
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("AZ")}
            ></input>
            Alitalia Societa Aerea Italiana
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("PC")}
            ></input>
            Pegasus Hava Tasimaciligi A.S.
          </label>
          <label>
            <input
              type="checkbox"
              name="carriers"
              onChange={() => handleFilterToggle("SN")}
            ></input>
            Brussels Airlines
          </label>
          <div className="bottomGreyBlock"></div>
        </div>
      </div>
      <div className="cardContainer">
        {tickets.length ? (
          <div style={{ width: "100%" }}>
            {tickets.map((elem, index) => (
              <FlightCard ticket={elem} key={index}></FlightCard>
            ))}
          </div>
        ) : (
          <div>Билетов не найдено</div>
        )}
        {tickets.length ? (
          <button onClick={handleAddMore}>Показать еще</button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
