import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [nom, setNom] = useState(""); // Création des state à vide "" pour vider les champs après le succès
  const [prenom, setPrenom] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Vérifie si tous les champs sont remplis
  const isFormValid = nom && prenom && selectValue && email && message;
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // Rappel de la fonction onSuccess pour afficher le message de confirmation 
        onSuccess();
         // Réinitialiser les champs
         setNom("");
         setPrenom("");
         setSelectValue ("");
         setEmail("");
         setMessage("");
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" 
           value={nom}                      // Définit la valeur
           onChange={(e) => setNom(e.target.value)} />
          <Field placeholder="" label="Prénom"  value={prenom}
            onChange={(e) => setPrenom(e.target.value)}/>
          <Select
            selection={["Personel", "Entreprise"]}
            value={selectValue}
            onChange={(newValue) => setSelectValue(newValue)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <Button type={BUTTON_TYPES.SUBMIT}
          title={sending ? "En cours" : "Envoyer"} // ajout de title
          disabled={sending || !isFormValid} data-testid="button-test-id" > {/* envoyer si tous les champs sont remplis */}
            
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
