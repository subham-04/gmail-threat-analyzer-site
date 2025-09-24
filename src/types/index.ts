// Gmail Threat Analyzer Types

export interface EmailData {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  body: string;
  headers: Record<string, string>;
  timestamp: Date;
  attachments?: AttachmentData[];
}

export interface AttachmentData {
  filename: string;
  mimeType: string;
  size: number;
  content?: ArrayBuffer;
}

export interface ThreatAnalysis {
  id: string;
  emailId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  threats: Threat[];
  score: number;
  timestamp: Date;
}

export interface Threat {
  type: ThreatType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: string[];
  confidence: number;
}

export type ThreatType = 
  | 'phishing'
  | 'malware'
  | 'spam'
  | 'social_engineering'
  | 'suspicious_link'
  | 'suspicious_attachment'
  | 'spoofing'
  | 'business_email_compromise';

export interface AnalysisConfig {
  enablePhishingDetection: boolean;
  enableMalwareScanning: boolean;
  enableLinkAnalysis: boolean;
  enableAttachmentScanning: boolean;
  sensitivityLevel: 'low' | 'medium' | 'high';
}
