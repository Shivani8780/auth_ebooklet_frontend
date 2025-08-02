import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserEbooklets = () => {
  const [ebooklets, setEbooklets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEbookletId, setSelectedEbookletId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/user/ebooklet/', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch ebooklets');
        }
        return res.json();
      })
      .then((data) => {
        setEbooklets(data.ebooklets || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const selectedEbooklet = ebooklets.find((e) => e.id.toString() === selectedEbookletId?.toString());

  const handleContinue = (ebookletId) => {
    navigate(`/pdf-viewer?ebookletId=${ebookletId.toString()}`);
  };

  if (loading) {
    return <div>Loading your ebooklets...</div>;
  }

  if (ebooklets.length === 0) {
    return <div>No approved ebooklets available.</div>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#e0e5ec', // 🌟 Background outside cards
        padding: '50px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: 'auto',
          padding: '30px',
          borderRadius: '20px',
          backgroundColor: '#5a657a', // container color
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{ textAlign: 'center', marginBottom: '30px', color: '#f0f4ff' }}
        >
          Your Approved Ebooklets
        </h2>

        <div style={{ marginBottom: '20px', color: '#f0f4ff', fontWeight: '600' }}>
          {ebooklets.map((ebooklet) => (
            <div
              key={ebooklet.id}
              style={{
                display: 'flex',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                backgroundColor: '#2c2c54',
                cursor: 'pointer',
                minHeight: '180px',
                marginBottom: '20px',
              }}
              onClick={() => handleContinue(ebooklet.id)}
            >
              <div
                style={{
                  backgroundColor: '#2c2c54',
                  color: 'white',
                  padding: '20px 25px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minWidth: '180px',
                  fontWeight: '700',
                  fontSize: '18px',
                  letterSpacing: '0.5px',
                }}
              >
                {ebooklet.name}
                <a
                  href="#"
                  style={{
                    marginTop: '8px',
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#a5a5d6',
                    textDecoration: 'none',
                  }}
                >
                  
                </a>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '20px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  backgroundColor: '#f0f4ff',
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    fontSize: '20px',
                    color: '#222',
                  }}
                >
                  {ebooklet.currentChapterName || 'Selected eBooklet'}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '30px',
                    fontSize: '12px',
                    color: '#999',
                  }}
                >
                  
                </div>
                <button
                  style={{
                    marginTop: '15px',
                    alignSelf: 'flex-start',
                    padding: '10px 25px',
                    backgroundColor: '#2c2c54',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    boxShadow: '0 4px 8px rgba(44, 44, 84, 0.4)',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a3d';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(26, 26, 61, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2c2c54';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(44, 44, 84, 0.4)';
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserEbooklets;
