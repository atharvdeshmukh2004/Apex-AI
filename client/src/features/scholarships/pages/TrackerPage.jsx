import React from 'react';
import { daysLeft, fmtAmt, deadlineColor } from '../utils/helpers';


export default function TrackerPage({ scholarships, toggleSave, toggleApply }) {
  const saved = scholarships.filter((s) => s.saved);
  const applied = scholarships.filter((s) => s.applied);
  const urgent = saved.filter((s) => {
    const d = daysLeft(s.deadline);
    return d >= 0 && d <= 15;
  });

  return (
    <div className="sp-root sp-page">
      <div className="sp-page-title">My Tracker</div>
      <div className="sp-page-sub">Track saved scholarships and manage your applications</div>

      {/* Urgent banner */}
      {urgent.length > 0 && (
        <div className="sp-banner sp-banner-warning">
          🔔
          <span>
            {urgent.length} saved scholarship{urgent.length > 1 ? 's' : ''} closing within 15 days!
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="sp-grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="sp-metric">
          <div className="sp-metric-label">Saved</div>
          <div className="sp-metric-value">{saved.length}</div>
        </div>
        <div className="sp-metric">
          <div className="sp-metric-label">Applied</div>
          <div className="sp-metric-value">{applied.length}</div>
        </div>
        <div className="sp-metric">
          <div className="sp-metric-label">Closing soon</div>
          <div className="sp-metric-value" style={{ color: '#dc2626' }}>{urgent.length}</div>
        </div>
        <div className="sp-metric">
          <div className="sp-metric-label">Potential value</div>
          <div className="sp-metric-value" style={{ fontSize: '16px' }}>
            {fmtAmt(applied.reduce((a, s) => a + s.amount, 0))}
          </div>
        </div>
      </div>

      {/* Saved table */}
      <div className="sp-section-title">Saved Scholarships</div>
      {saved.length === 0 ? (
        <div className="sp-empty">
          No saved scholarships yet. Browse and ☆ save scholarships to track them here.
        </div>
      ) : (
        <div className="sp-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="sp-table">
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {saved.map((sc) => {
                const days = daysLeft(sc.deadline);
                return (
                  <tr key={sc.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{sc.name}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{sc.org}</div>
                    </td>
                    <td>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>{fmtAmt(sc.amount)}</span>
                    </td>
                    <td>
                      <span className={`sp-badge ${deadlineColor(days)}`} style={{ fontSize: '11px' }}>
                        {days < 0 ? 'Closed' : days === 0 ? 'Today!' : days <= 30 ? `${days}d left` : sc.deadline}
                      </span>
                    </td>
                    <td>
                      <div className="sp-status-row">
                        <div
                          className="sp-status-dot"
                          style={{ background: sc.applied ? '#16a34a' : '#d1d5db' }}
                        />
                        <span style={{ fontSize: '12px' }}>{sc.applied ? 'Applied' : 'Pending'}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className={`sp-btn ${sc.applied ? 'sp-btn-success' : 'sp-btn-primary'}`}
                          style={{ fontSize: '11px', padding: '4px 10px' }}
                          onClick={() => toggleApply(sc.id)}
                        >
                          {sc.applied ? '✓ Applied' : 'Mark Applied'}
                        </button>
                        <button
                          className="sp-btn sp-btn-danger"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          onClick={() => toggleSave(sc.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Applied cards */}
      {applied.length > 0 && (
        <>
          <div className="sp-section-title" style={{ marginTop: '1.5rem' }}>
            Applications
          </div>
          <div className="sp-grid-2">
            {applied.map((sc) => (
              <div key={sc.id} className="sp-card">
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{sc.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{sc.org}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>{fmtAmt(sc.amount)}</span>
                  <span className="sp-badge sp-badge-green">✓ Applied</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
