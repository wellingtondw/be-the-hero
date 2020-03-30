import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function NewIncident() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: ""
  });

  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  const handleChange = field => event => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      const response = await api.post("incidents", formData, {
        headers: {
          Authorization: ongId
        }
      });

      history.push("/profile");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            onChange={handleChange("title")}
            value={formData.title}
          />
          <textarea
            placeholder="Descrição"
            onChange={handleChange("description")}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            onChange={handleChange("value")}
            value={formData.value}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
