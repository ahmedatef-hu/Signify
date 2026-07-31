import { useState } from 'react';
import Navbar from '../components/Navbar';

const SignGuide = () => {
  const [selectedSigns, setSelectedSigns] = useState([]);

  const practiceSign = (signName, emoji, event) => {
    event.stopPropagation();
    
    const index = selectedSigns.findIndex(s => s.name === signName);
    
    if (index > -1) {
      // Remove sign
      const newSigns = [...selectedSigns];
      newSigns.splice(index, 1);
      setSelectedSigns(newSigns);
    } else {
      // Add sign
      setSelectedSigns([...selectedSigns, { name: signName, emoji: emoji }]);
    }
  };

  const startPractice = () => {
    if (selectedSigns.length === 0) {
      alert('اختر إشارة واحدة على الأقل!');
      return;
    }
    
    localStorage.setItem('selectedSigns', JSON.stringify(selectedSigns));
    localStorage.setItem('practiceMode', 'true');
    
    window.location.href = '/#sign-to-speech';
  };

  const isSelected = (signName) => {
    return selectedSigns.some(s => s.name === signName);
  };

  const getSignOrder = (signName) => {
    const index = selectedSigns.findIndex(s => s.name === signName);
    return index !== -1 ? index + 1 : null;
  };

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
          }}>🤟 دليل لغة الإشارة الكامل</h1>
          <p style={{ color: '#666', fontSize: '1.3em' }}>
            جميع الإشارات المتاحة في النظام
          </p>
          
          {/* Practice Button */}
          {selectedSigns.length > 0 && (
            <button 
              onClick={startPractice}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '15px 30px',
                textAlign: 'center',
                borderRadius: '10px',
                marginTop: '20px',
                fontSize: '1.3em',
                fontWeight: 'bold',
                boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              🎥 الرجوع للتجربة
            </button>
          )}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px', 
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{ background: '#f8f9fa', padding: '15px 30px', borderRadius: '10px' }}>
              <div style={{ fontSize: '2em', color: '#667eea', fontWeight: 'bold' }}>16</div>
              <div style={{ color: '#666', fontSize: '0.9em' }}>إشارة متاحة</div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '15px 30px', borderRadius: '10px' }}>
              <div style={{ fontSize: '2em', color: '#667eea', fontWeight: 'bold' }}>85%</div>
              <div style={{ color: '#666', fontSize: '0.9em' }}>متوسط الدقة</div>
            </div>
            <div style={{ background: '#f8f9fa', padding: '15px 30px', borderRadius: '10px' }}>
              <div style={{ fontSize: '2em', color: '#667eea', fontWeight: 'bold' }}>5</div>
              <div style={{ color: '#666', fontSize: '0.9em' }}>فئات</div>
            </div>
          </div>
        </div>

        {/* Questions Category */}
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
          }}>❓ الأسئلة</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {[
              { emoji: '🕐', name: 'كم الساعة الآن؟', desc: 'قبضة عند المعصم + حركة دائرية', accuracy: '85%', steps: ['اعمل قبضة بيدك اليمنى ✊', 'ضعها أمام معصمك الأيسر ⌚', 'حركها في دائرة صغيرة 🔄', '2-3 دورات بطيئة'] },
              { emoji: '❓', name: 'من هذا؟', desc: 'يد ممدودة + حركة للأعلى والأسفل', accuracy: '85%', steps: ['افتح يدك بالكامل 🖐️', 'ضعها أمام جسمك', 'حركها للأعلى والأسفل ⬆️⬇️', '2-3 مرات ببطء'] },
              { emoji: '📍', name: 'فين؟', desc: 'سبابة يمين-يسار', accuracy: '85%', steps: ['ارفع سبابتك فقط ☝️', 'حركها يمين ويسار ↔️', 'حركة بطيئة ومنتظمة'] },
              { emoji: '📅', name: 'إمتى؟', desc: 'سبابة حركة دائرية صغيرة', accuracy: '80%', steps: ['ارفع سبابتك فقط ☝️', 'حركها في دائرة صغيرة 🔄', 'دائرة واحدة أو اثنتين'] },
              { emoji: '❔', name: 'ايه؟', desc: 'كف مفتوح يمين-يسار', accuracy: '85%', steps: ['افتح كفك بالكامل 🖐️', 'حركه يمين ويسار ↔️', 'حركة أفقية بطيئة'] }
            ].map((sign, idx) => (
              <div
                key={idx}
                onClick={(e) => practiceSign(sign.name, sign.emoji, e)}
                className={isSelected(sign.name) ? 'selected' : ''}
                data-order={getSignOrder(sign.name)}
                style={{
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  padding: '20px',
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '3em' }}>{sign.emoji}</div>
                  <div>
                    <div style={{ fontSize: '1.5em', color: '#333', fontWeight: 'bold' }}>{sign.name}</div>
                    <span style={{
                      background: '#4ade80',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9em',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      marginTop: '5px'
                    }}>{sign.accuracy}</span>
                  </div>
                </div>
                <div style={{ color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
                  <strong>الوصف:</strong> {sign.desc}
                </div>
                <div style={{ background: 'white', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
                  <ol style={{ marginRight: '20px', color: '#555' }}>
                    {sign.steps.map((step, i) => (
                      <li key={i} style={{ margin: '8px 0' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Greetings Category */}
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
          }}>👋 التحيات والتعبيرات</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            {[
              { emoji: '👋', name: 'مرحباً', desc: 'كف مفتوح + تلويح', accuracy: '90%', steps: ['افتح كفك 🖐️', 'لوح يمين ويسار', 'حركة ودية'] },
              { emoji: '✌️', name: 'سلام', desc: 'إشارة V', accuracy: '85%', steps: ['ارفع السبابة والوسطى ✌️', 'اقفل باقي الأصابع', 'شكل V واضح'] },
              { emoji: '🙏', name: 'شكراً', desc: 'راحة اليد من الذقن للأمام', accuracy: '85%', steps: ['افتح كفك 🖐️', 'المس ذقنك', 'حرك يدك للأمام'] }
            ].map((sign, idx) => (
              <div
                key={idx}
                onClick={(e) => practiceSign(sign.name, sign.emoji, e)}
                style={{
                  background: '#f8f9fa',
                  borderRadius: '15px',
                  padding: '20px',
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '3em' }}>{sign.emoji}</div>
                  <div>
                    <div style={{ fontSize: '1.5em', color: '#333', fontWeight: 'bold' }}>{sign.name}</div>
                    <span style={{
                      background: '#4ade80',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9em',
                      fontWeight: 'bold'
                    }}>{sign.accuracy}</span>
                  </div>
                </div>
                <div style={{ color: '#555', lineHeight: '1.6' }}>
                  <strong>الوصف:</strong> {sign.desc}
                </div>
                <div style={{ background: 'white', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
                  <ol style={{ marginRight: '20px', color: '#555' }}>
                    {sign.steps.map((step, i) => (
                      <li key={i} style={{ margin: '8px 0' }}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
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
          }}>💡 نصائح للحصول على أفضل نتائج</h2>
          <div style={{
            background: '#fff3cd',
            borderRight: '5px solid #ffc107',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#856404', marginBottom: '10px' }}>✅ قبل البدء:</h3>
            <ul style={{ marginRight: '20px', color: '#856404' }}>
              <li style={{ margin: '8px 0' }}>تأكد من وجود إضاءة جيدة</li>
              <li style={{ margin: '8px 0' }}>اجعل يدك في منتصف الكاميرا</li>
              <li style={{ margin: '8px 0' }}>استخدم خلفية بسيطة</li>
              <li style={{ margin: '8px 0' }}>حافظ على مسافة 50-70 سم من الكاميرا</li>
            </ul>
          </div>
          
          <div style={{
            background: '#d4edda',
            borderRight: '5px solid #28a745',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px'
          }}>
            <h3 style={{ color: '#155724', marginBottom: '10px' }}>✅ أثناء الإشارة:</h3>
            <ul style={{ marginRight: '20px', color: '#155724' }}>
              <li style={{ margin: '8px 0' }}>اجعل الحركات بطيئة وواضحة</li>
              <li style={{ margin: '8px 0' }}>انتظر ثانية بين كل إشارة وأخرى</li>
              <li style={{ margin: '8px 0' }}>حافظ على يدك في إطار الكاميرا</li>
              <li style={{ margin: '8px 0' }}>كرر الإشارة إذا لم تُكتشف</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignGuide;
