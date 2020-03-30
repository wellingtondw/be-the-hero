import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: ""
  });

  const history = useHistory();

  const handleChange = field => event => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("ongs", formData);

      alert(`Seu ID de acesso ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para o logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={formData.name}
            onChange={handleChange("name")}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange("email")}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange("whatsapp")}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={formData.city}
              onChange={handleChange("city")}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={formData.uf}
              onChange={handleChange("uf")}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
