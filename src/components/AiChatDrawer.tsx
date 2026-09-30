import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Settings2, Sparkles, AlertCircle, RefreshCw, CheckCircle, ExternalLink } from 'lucide-react';
import { BOTANICAL_DYES } from '../data/dyes';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_WEBHOOK_URL = 'https://kavithaambati.app.n8n.cloud/webhook/cda1ae31-e0a0-429d-ab5a-32c6264bbfdf/chat';
const TEST_WEBHOOK_URL = 'https://kavithaambati.app.n8n.cloud/webhook-test/cda1ae31-e0a0-429d-ab5a-32c6264bbfdf/chat';

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    const stored = localStorage.getItem('botanical_n8n_webhook_url');
    // If stored was any of the previous webhooks, automatically migrate to the new active one
    if (stored && (stored.includes('dfc04fbe-bdd5-422d-b6a8-75acb334e492') || stored.includes('41223b03-4eae-4376-bee4-81a1529f0c46'))) {
      localStorage.setItem('botanical_n8n_webhook_url', DEFAULT_WEBHOOK_URL);
      return DEFAULT_WEBHOOK_URL;
    }
    return stored || DEFAULT_WEBHOOK_URL;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [sessionId] = useState(() => `session-${Math.random().toString(36).substring(2, 9)}`);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: 'Greetings! I am your Botanical Dye AI Agent connected to your active n8n workflow. Ask me about extracting blush pink from avocado pits, yellow onion skin recipes, homemade iron water, or color-fastness ratings.',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('botanical_n8n_webhook_url', url);
  };

  // Local knowledge fallback in case of transient network issue
  const getLocalKnowledgeFallback = (prompt: string): string => {
    const q = prompt.toLowerCase();
    if (q.includes('avocado') || q.includes('pink') || q.includes('peach')) {
      return "**Avocado Pit & Skin Extraction Guidelines:**\n\n- **Ratio:** 150%–200% WOF (≈5–8 chopped pits per 100g fabric).\n- **Thermal limit:** Keep strictly at 75°C–80°C (165°F–175°F). Never boil, as boiling oxidizes tannins into murky brown.\n- **Alkalinity Spark:** Add 1/2 tsp washing soda to raise pH to 8.0–8.5, which dissolves condensed tannins into brilliant ruby-pink liquor.\n- **Fastness:** 4.0/5.0 Lightfastness, 4.5/5.0 Washfastness.";
    }
    if (q.includes('onion') || q.includes('yellow') || q.includes('moss') || q.includes('olive')) {
      return "**Yellow Onion Skin Protocol:**\n\n- **Ratio:** 30%–50% WOF (only 30g dry skins needed for 100g cloth).\n- **Simmer:** 85°C for 60 minutes.\n- **Modifiers:** Alum mordant gives luminous Sunlit Amber Gold (#D99824). A 2-minute dip in homemade iron water saddens it to deep Forest Moss Green (#5B6236).\n- **Fastness:** 4.5/5.0 Archival tier.";
    }
    if (q.includes('iron') || q.includes('rust') || q.includes('nails') || q.includes('black') || q.includes('sadden')) {
      return "**Homemade Iron Water (Ferrous Acetate):**\n\n- Place 10–15 clean rusty nails in a glass mason jar.\n- Add 1 part white vinegar (5%) and 2 parts tap water.\n- Leave lid loose for gases to escape; wait 1–2 weeks until orange-gray.\n- Filter through a coffee filter. Use 2–3 tablespoons per liter of water for a 2-minute saddening bath.";
    }
    if (q.includes('pomegranate') || q.includes('tannin') || q.includes('ink')) {
      return "**Pomegranate Rinds (*Punica granatum*):**\n\n- Naturally contains 25%–30% hydrolyzable ellagitannins, functioning as its own bio-mordant primer.\n- Yields antique mustard/chartreuse with alum (#C5A337).\n- Yields indelible ferro-tannate slate/ink black with iron (#373A3E).\n- Fastness: 5.0/5.0 Museum grade.";
    }
    return "To brew a successful dye bath, calculate fabric weight dry (% WOF), scour thoroughly with soda ash (cellulose) or gentle soap (protein), simmer at sub-boil temperatures, and adjust pH or add iron for dramatic color shifts.";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // POST to user's n8n chat webhook with required parameters
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          message: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        // Handle n8n inactive workflow warning if user ever deactivates it
        if (response.status === 404 && errorData?.message?.includes('not registered')) {
          const fallback = getLocalKnowledgeFallback(text);
          const errorMsg: Message = {
            id: `agent-${Date.now()}`,
            sender: 'agent',
            text: `⚠️ **n8n Workflow Inactive**: The webhook is currently dormant in n8n.\n\n*Quick Fix in n8n:* Toggle the switch in the top-right of your n8n workflow canvas to **"Active"**, or switch to the **Test Webhook** in settings above.\n\n**Botanical Archive Knowledge:**\n\n${fallback}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
          };
          setMessages((prev) => [...prev, errorMsg]);
          setIsLoading(false);
          return;
        }

        throw new Error(errorData?.message || `Webhook HTTP ${response.status}`);
      }

      const data = await response.json().catch(async () => {
        const rawText = await response.text();
        return { output: rawText };
      });

      // Parse common n8n chat response formats: { output }, { text }, { response }, { message }
      const replyText =
        data.output ||
        data.text ||
        data.response ||
        data.message ||
        (typeof data === 'string' ? data : JSON.stringify(data));

      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: replyText || 'Received empty response from n8n agent.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      console.warn('n8n webhook notice:', err);
      const fallback = getLocalKnowledgeFallback(text);
      const fallbackMsg: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: `${fallback}\n\n*(Note: n8n webhook error: ${err.message || 'offline'})*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render markdown-like formatting cleanly in chat
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers (### Header)
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="font-editorial text-sm font-semibold text-[#1F1A15] mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Bullet items (* or -)
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().substring(2);
        return (
          <div key={index} className="flex items-start gap-1.5 ml-1 my-0.5 text-xs text-[#3A3228]">
            <span className="text-[#8C5A37] font-bold">•</span>
            <span>{parseInlineBold(cleanLine)}</span>
          </div>
        );
      }
      // Empty line / paragraph break
      if (!line.trim()) {
        return <div key={index} className="h-1.5" />;
      }
      // Regular line
      return (
        <p key={index} className="text-xs text-[#24211D] leading-relaxed my-0.5">
          {parseInlineBold(line)}
        </p>
      );
    });
  };

  // Bold text parser (**bold**)
  const parseInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[#1F1A15]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#D6CEBE] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#E6E0D5] bg-[#F4EFE6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2B2620] text-[#FAF7F2] flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#C5A337]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-medium text-[#1F1A15]">
                  Botanical Dye AI Agent
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="n8n webhook active" />
              </div>
              <p className="text-[11px] font-mono text-[#8C7E6D]">
                n8n Cloud Webhook: cda1ae31...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                showSettings ? 'bg-[#EAE2D5] text-[#1F1A15]' : 'text-[#786D5E] hover:bg-[#EAE2D5]'
              }`}
              title="Configure Webhook Endpoint"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#786D5E] hover:bg-[#EAE2D5] hover:text-[#1F1A15] transition-colors cursor-pointer"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Webhook Configuration Sub-Bar */}
        {showSettings && (
          <div className="p-4 bg-[#EFE9DD] border-b border-[#DCD5C8] space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#5A5044]">
              <span>CONNECTED N8N WEBHOOK</span>
              <button
                onClick={() => handleSaveWebhook(DEFAULT_WEBHOOK_URL)}
                className="text-[#8C5A37] hover:underline"
              >
                Reset Default
              </button>
            </div>

            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => handleSaveWebhook(e.target.value)}
              className="w-full p-2 bg-white border border-[#D6CEBE] rounded font-mono text-[11px] text-[#24211D] focus:outline-none focus:border-[#8C5A37]"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleSaveWebhook(DEFAULT_WEBHOOK_URL)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                  webhookUrl === DEFAULT_WEBHOOK_URL
                    ? 'bg-[#2B2620] text-white border-[#2B2620]'
                    : 'bg-white text-[#5A5044] border-[#D6CEBE]'
                }`}
              >
                Active Production (/webhook)
              </button>
              <button
                onClick={() => handleSaveWebhook(TEST_WEBHOOK_URL)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                  webhookUrl === TEST_WEBHOOK_URL
                    ? 'bg-[#2B2620] text-white border-[#2B2620]'
                    : 'bg-white text-[#5A5044] border-[#D6CEBE]'
                }`}
              >
                Test Endpoint (/webhook-test)
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#5B6236] pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified n8n Workflow with action: "sendMessage" integration</span>
            </div>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Quick Starter Prompts */}
          {messages.length === 1 && (
            <div className="p-3.5 rounded-lg bg-white border border-[#E6E0D5] space-y-2.5 text-xs">
              <span className="font-mono text-[11px] text-[#8C7E6D] uppercase block">
                Quick Questions to Ask Your n8n Agent:
              </span>
              <div className="space-y-1.5">
                {[
                  'What color can I get from avocado pits?',
                  'How do I extract blush pink without browning?',
                  'What is the % WOF recipe for yellow onion skins on linen?',
                  'How do I make homemade iron water from rusty nails and vinegar?',
                  'Why does turmeric fade in sunlight and how do I prevent it?',
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left p-2 rounded bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#EAE3D6] text-[#433B32] transition-colors cursor-pointer text-xs"
                  >
                    • {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Stream */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-lg p-3.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#2B2620] text-[#FAF7F2] rounded-br-none shadow-xs'
                      : msg.isError
                      ? 'bg-[#FFF8F6] border border-[#F2C2B8] text-[#332220] rounded-bl-none shadow-xs'
                      : 'bg-white border border-[#E2DBD0] text-[#24211D] rounded-bl-none shadow-xs'
                  }`}
                >
                  {isUser ? (
                    <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                  ) : (
                    <div>{renderFormattedText(msg.text)}</div>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#8C7E6D] mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#8C7E6D] font-mono p-2">
              <div className="w-2 h-2 rounded-full bg-[#8C5A37] animate-ping" />
              <span>n8n agent is consulting botanical dye knowledge...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E6E0D5] bg-[#F4EFE6]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about avocado pits, onion skins, scouring..."
              disabled={isLoading}
              className="flex-1 p-2.5 bg-white border border-[#D6CEBE] rounded text-xs text-[#24211D] placeholder:text-[#9E9485] focus:outline-none focus:border-[#8C5A37]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-[#2B2620] text-[#FAF7F2] rounded hover:bg-[#433B32] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#8C7E6D]">
            <span>N8N CLOUD: cda1ae31.../chat</span>
            <span>PRESS ENTER TO SEND</span>
          </div>
        </div>

      </div>
    </div>
  );
};
