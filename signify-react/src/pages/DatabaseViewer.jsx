import { useState, useEffect } from 'react';

const DatabaseViewer = () => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    fetch('/sign-language-database.json')
      .then(res => res.json())
      .then(data => setDatabase(data))
      .catch(err => console.error('Error loading database:', err));
  }, []);

  if (!database) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', fontSize: '2em' }}>جاري التحميل...</div>
      </div>
    );
  }

  const allSigns = [
    ...(database.signs?.questions || []),
    ...(database.signs?.greetings || []),
    ...(database.signs?.responses || []),
    ...(database.signs?.actions || [])
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: '#667eea',
            fontSize: '3em',
            marginBottom: '10px'
          }}>📊 قاعدة بيانات لغة الإشارة</h1>
          <p style={{ color: '#666', fontSize: '1.2em', marginTop: '10px' }}>
            جميع البيانات والإحصائيات الخاصة بنظام Signfiy
          </p>
        </div>

        {/* Statistics */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{
            color: '#667eea',
            fontSize: '2em',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '3px solid #667eea'
          }}>📈 الإحصائيات</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #667eea'
            }}>
              <div style={{ fontSize: '3em', color: '#667eea', fontWeight: 'bold' }}>16</div>
              <div style={{ color: '#666', marginTop: '10px', fontSize: '1.1em' }}>إشارة متاحة</div>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #667eea'
            }}>
              <div style={{ fontSize: '3em', color: '#667eea', fontWeight: 'bold' }}>4</div>
              <div style={{ color: '#666', marginTop: '10px', fontSize: '1.1em' }}>فئات</div>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #667eea'
            }}>
              <div style={{ fontSize: '3em', color: '#667eea', fontWeight: 'bold' }}>85%</div>
              <div style={{ color: '#666', marginTop: '10px', fontSize: '1.1em' }}>متوسط الدقة</div>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              border: '2px solid #667eea'
            }}>
              <div style={{ fontSize: '3em', color: '#667eea', fontWeight: 'bold' }}>15</div>
              <div style={{ color: '#666', marginTop: '10px', fontSize: '1.1em' }}>حركة 3D</div>
            </div>
          </div>
        </div>

        {/* Signs Table */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{
            color: '#667eea',
            fontSize: '2em',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '3px solid #667eea'
          }}>📋 جدول الإشارات الكامل</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ background: '#667eea', color: 'white' }}>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>#</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الرمز</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الاسم بالعربية</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الاسم بالإنجليزية</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الفئة</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الوصف</th>
                  <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.1em' }}>الدقة</th>
                </tr>
              </thead>
              <tbody>
                {allSigns.map((sign, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #ddd',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '15px' }}><strong>{sign.id}</strong></td>
                    <td style={{ padding: '15px', fontSize: '2em', textAlign: 'center' }}>{sign.emoji}</td>
                    <td style={{ padding: '15px' }}><strong>{sign.name_ar}</strong></td>
                    <td style={{ padding: '15px' }}>{sign.name_en}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: '#667eea',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9em'
                      }}>
                        {sign.category}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>{sign.description}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: '#4ade80',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                      }}>
                        {sign.accuracy}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{
            color: '#667eea',
            fontSize: '2em',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '3px solid #667eea'
          }}>✨ المميزات</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'التعرف على لغة الإشارة من الكاميرا',
              'تحويل الصوت إلى لغة إشارة عبر أفاتار 3D',
              'دعم 16 إشارة مختلفة',
              'أفاتار ثلاثي الأبعاد واقعي',
              'نظام تدريب تفاعلي'
            ].map((feature, index) => (
              <li
                key={index}
                style={{
                  padding: '12px',
                  margin: '8px 0',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  borderRight: '4px solid #667eea'
                }}
              >
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Details */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{
            color: '#667eea',
            fontSize: '2em',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '3px solid #667eea'
          }}>🔧 التفاصيل التقنية</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>📹 كشف الكاميرا</h3>
              <p><strong>المكتبة:</strong> MediaPipe Hands</p>
              <p><strong>الدقة:</strong> 70%+</p>
              <p><strong>عدد الأيدي:</strong> 2</p>
              <p><strong>Cooldown:</strong> 2 ثانية</p>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🎭 الأفاتار 3D</h3>
              <p><strong>المكتبة:</strong> Three.js</p>
              <p><strong>الصيغة:</strong> GLB</p>
              <p><strong>الحركات:</strong> 15</p>
              <p><strong>Bones:</strong> 6 مجموعات</p>
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🔊 تحويل الصوت</h3>
              <p><strong>اللغة:</strong> ar-SA</p>
              <p><strong>السرعة:</strong> 0.9</p>
              <p><strong>الطبقة:</strong> 1</p>
              <p><strong>الصوت:</strong> 1</p>
            </div>
          </div>
        </div>

        {/* JSON Viewer */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{
            color: '#667eea',
            fontSize: '2em',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '3px solid #667eea'
          }}>📄 عرض JSON الكامل</h2>
          <div style={{
            background: '#2d2d2d',
            color: '#f8f8f2',
            padding: '20px',
            borderRadius: '10px',
            overflowX: 'auto',
            fontFamily: "'Courier New', monospace",
            fontSize: '14px',
            lineHeight: '1.6',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            <pre>{JSON.stringify(database, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewer;
