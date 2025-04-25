import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState({
    unitValue: "",
    unitCount: "",
    directCost: "",
    indirectFactor: ""
  });

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
    }
  };

  const addProject = () => {
    setView("new");
  };

  const calculate = () => {
    const unitValue = parseFloat(formData.unitValue) || 0;
    const unitCount = parseFloat(formData.unitCount) || 0;
    const directCost = parseFloat(formData.directCost) || 0;
    const indirectFactor = parseFloat(formData.indirectFactor) || 0;

    const totalIncome = unitValue * unitCount;
    const totalDirect = directCost * unitCount;
    const totalIndirect = totalIncome * indirectFactor;
    const totalCost = totalDirect + totalIndirect;
    const profit = totalIncome - totalCost;

    return { totalIncome, totalDirect, totalIndirect, totalCost, profit };
  };

  const { totalIncome, totalDirect, totalIndirect, totalCost, profit } = calculate();

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
        <div style={{ width: 320, padding: 24, background: "white", borderRadius: 12 }}>
          <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>התחברות</h1>
          <Input placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>התחבר</Button>
        </div>
      </div>
    );
  }

  if (view === "new") {
    return (
      <div style={{ padding: 24, background: "white", minHeight: "100vh" }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>פרויקט חדש</h1>
        <div style={{ display: "grid", gap: 12, maxWidth: 400 }}>
          <Input placeholder="שווי יח\"ד" value={formData.unitValue} onChange={(e) => setFormData({ ...formData, unitValue: e.target.value })} />
          <Input placeholder="מספר יח\"ד" value={formData.unitCount} onChange={(e) => setFormData({ ...formData, unitCount: e.target.value })} />
          <Input placeholder="עלות בנייה ישירה" value={formData.directCost} onChange={(e) => setFormData({ ...formData, directCost: e.target.value })} />
          <Input placeholder="מקדם עלויות עקיפות (למשל 0.3)" value={formData.indirectFactor} onChange={(e) => setFormData({ ...formData, indirectFactor: e.target.value })} />
        </div>
        <div style={{ marginTop: 24, background: "#f3f4f6", padding: 16, borderRadius: 12 }}>
          <div>סה\"כ הכנסות: {totalIncome.toLocaleString()}</div>
          <div>סה\"כ עלויות ישירות: {totalDirect.toLocaleString()}</div>
          <div>סה\"כ עלויות עקיפות: {totalIndirect.toLocaleString()}</div>
          <div>סה\"כ עלויות: {totalCost.toLocaleString()}</div>
          <div style={{ fontWeight: "bold" }}>רווח: {profit.toLocaleString()}</div>
        </div>
        <Button style={{ marginTop: 16 }} onClick={() => setView("list")}>חזור לרשימה</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>הפרויקטים שלי</h1>
        <Button onClick={addProject}>פרויקט חדש</Button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent>{project.name}</CardContent>
          </Card>
        ))}
        {projects.length === 0 && <p style={{ color: "#6b7280" }}>אין פרויקטים עדיין.</p>}
      </div>
    </div>
  );
}