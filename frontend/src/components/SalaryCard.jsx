import { salaryItems } from "../data/skills"

function SalaryCard() {
    // Show top 8 on dashboard card
    const visible = salaryItems.slice(0, 8)

    return (
        <div className="card">

            <p className="salary-card-title">💰 Average Global Salaries</p>
            <p className="salary-card-subtitle">Annual compensation for in-demand tech roles (USD).</p>

            {visible.map(s => (
                <div className="salary-item" key={s.role}>
                    <span className="salary-role">{s.role}</span>
                    <span className="salary-amount">{s.salary}</span>
                </div>
            ))}

        </div>
    )
}

export default SalaryCard