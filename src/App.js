import React, { useState, useEffect } from "react";
import "./App.css";

function WeatherApp() {
  const [ville, setVille] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempsPrincipal, setTempsPrincipal] = useState("");
  const [description, setDescription] = useState("");
  const [icone, setIcone] = useState("");
  const [leverSoleil, setLeverSoleil] = useState("");
  const [coucherSoleil, setCoucherSoleil] = useState("");
  const [estPret, setEstPret] = useState(false);
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");

  useEffect(() => {
    obtenirDonneesMeteo(latitude, longitude);
  }, [latitude, longitude]);

  const obtenirDonneesMeteo = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=45f045c532acd732c3edaf1896459dc1&units=metric`
    )
      .then((resultat) => resultat.json())
      .then((resultatJson) => {
        setVille(resultatJson.name);
        setTemperature(resultatJson.main.temp);
        setTempsPrincipal(resultatJson.weather[0].main);
        setDescription(resultatJson.weather[0].description);
        setIcone(resultatJson.weather[0].icon);
        setLeverSoleil(new Date(resultatJson.sys.sunrise * 1000).toLocaleTimeString());
        setCoucherSoleil(new Date(resultatJson.sys.sunset * 1000).toLocaleTimeString());
        setEstPret(true);
      })
      .catch((err) => console.error(err));
  };

  const soumettreFormulaire = (event) => {
    event.preventDefault();
    const formulaire = event.target;
    const nouvelleLatitude = formulaire.elements.latitude.value;
    const nouvelleLongitude = formulaire.elements.longitude.value;
    setLatitude(nouvelleLatitude);
    setLongitude(nouvelleLongitude);
  };

  const obtenirClasseCouleurFond = (temperature) => {
    if (temperature <= 0) {
      return 'froid-bg';
    } else if (temperature > 0 && temperature <= 15) {
      return 'frais-bg';
    } else if (temperature > 15 && temperature <= 25) {
      return 'doux-bg';
    } else {
      return 'chaud-bg';
    }
  };

  const classeCouleurFond = obtenirClasseCouleurFond(temperature);

  return (
    <div className={`app-meteo ${classeCouleurFond}`}>
      <header className="en-tete-app">
        <h1>Prévisions Météo</h1>
      </header>
      <div className="contenu-app">
        <div className="section-meteo">
          {estPret ? (
            <div className="infos-meteo">
              <h2>Météo Actuelle à {ville}</h2>
              <div className="colonnes-meteo">
                <div className="colonne-meteo">
                  <div className="item-meteo temperature">
                    <p>Température : {temperature} °C</p>
                  </div>
                  <div className="item-meteo principal">
                    <p>Météo Principale : {tempsPrincipal}</p>
                  </div>
                  <div className="item-meteo description">
                    <p>Description : {description}</p>
                  </div>
                </div>
                <div className="colonne-meteo">
                  <div className="item-meteo icone">
                    <img
                      src={`http://openweathermap.org/img/wn/${icone}.png`}
                      alt="Icône Météo"
                    />
                  </div>
                  <div className="item-meteo lever-soleil">
                    <p>Heure de Lever du Soleil : {leverSoleil}</p>
                  </div>
                  <div className="item-meteo coucher-soleil">
                    <p>Heure de Coucher du Soleil : {coucherSoleil}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Chargement...</div>
          )}
        </div>
        <div className="section-formulaire">
          <div className="en-tete-formulaire">
            <h2>Entrer les Coordonnées</h2>
          </div>
          <form className="formulaire-coordonnees" onSubmit={soumettreFormulaire}>
            <div className="item-formulaire">
              <label htmlFor="latitude">Latitude : </label>
              <input type="text" id="latitude" name="latitude" defaultValue={latitude} required />
            </div>
            <div className="item-formulaire">
              <label htmlFor="longitude">Longitude : </label>
              <input type="text" id="longitude" name="longitude" defaultValue={longitude} required />
            </div>
            <button type="submit">Obtenir la Météo</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
