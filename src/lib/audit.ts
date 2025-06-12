/**
 * Audit Trail utilities for institutional-grade security logging
 * This module provides comprehensive audit logging for regulatory compliance
 */

import { USER_TYPES } from './constants';

// Type definitions for audit events
type AuditEventType = 
  | 'login' 
  | 'login_failure' 
  | 'logout' 
  | 'access_denied' 
  | 'document_access' 
  | 'document_creation' 
  | 'document_modification'
  | 'deal_creation'
  | 'deal_modification'
  | 'deal_closing'
  | 'syndication'
  | 'credit_analysis'
  | 'valuation'
  | 'compliance_check';

interface AuditEvent {
  timestamp: string;
  userId: string;
  userEmail: string;
  userType: string;
  eventType: AuditEventType;
  ipAddress: string;
  resourceId?: string;
  resourceType?: string;
  details: Record<string, unknown>;
}

// In production, this would log to a secure, tamper-evident storage system
const auditLog: AuditEvent[] = [];

/**
 * Get the client's IP address (in production would use proper IP detection)
 */
const getClientIP = (): string => {
  // In production, this would extract the actual client IP
  return '127.0.0.1';
};

/**
 * Log an event to the audit trail
 */
export const logAuditEvent = (
  userId: string,
  userEmail: string,
  userType: string,
  eventType: AuditEventType,
  details: Record<string, unknown> = {},
  resourceId?: string,
  resourceType?: string
): void => {
  const auditEvent: AuditEvent = {
    timestamp: new Date().toISOString(),
    userId,
    userEmail,
    userType,
    eventType,
    ipAddress: getClientIP(),
    resourceId,
    resourceType,
    details
  };

  // Store the audit event
  auditLog.push(auditEvent);
  
  // In production, we would send this to a secure audit log server
  console.log(`[AUDIT] ${eventType.toUpperCase()} | User: ${userEmail} | Resource: ${resourceType || 'N/A'}:${resourceId || 'N/A'} | ${auditEvent.timestamp}`);
};

/**
 * Get filtered audit logs for regulatory reporting
 * In production, this would include pagination and more complex filtering
 */
export const getAuditLogs = (
  filter: {
    userId?: string;
    userType?: string;
    eventType?: AuditEventType;
    fromDate?: Date;
    toDate?: Date;
    resourceType?: string;
    resourceId?: string;
  } = {}
): AuditEvent[] => {
  return auditLog.filter(event => {
    let include = true;
    
    if (filter.userId && event.userId !== filter.userId) include = false;
    if (filter.userType && event.userType !== filter.userType) include = false;
    if (filter.eventType && event.eventType !== filter.eventType) include = false;
    if (filter.resourceType && event.resourceType !== filter.resourceType) include = false;
    if (filter.resourceId && event.resourceId !== filter.resourceId) include = false;
    
    if (filter.fromDate) {
      const eventDate = new Date(event.timestamp);
      if (eventDate < filter.fromDate) include = false;
    }
    
    if (filter.toDate) {
      const eventDate = new Date(event.timestamp);
      if (eventDate > filter.toDate) include = false;
    }
    
    return include;
  });
};

/**
 * For regulated users like pension funds, get a compliance report
 */
export const generateComplianceReport = (userType: string, startDate: Date, endDate: Date) => {
  // In a real implementation, this would generate a detailed compliance report
  // based on audit logs and other system data
  const relevantLogs = getAuditLogs({
    userType,
    fromDate: startDate,
    toDate: endDate
  });
  
  return {
    userType,
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    summary: {
      totalEvents: relevantLogs.length,
      documentAccesses: relevantLogs.filter(log => log.eventType === 'document_access').length,
      dealInteractions: relevantLogs.filter(log => 
        log.eventType === 'deal_creation' || 
        log.eventType === 'deal_modification' ||
        log.eventType === 'deal_closing'
      ).length,
      complianceChecks: relevantLogs.filter(log => log.eventType === 'compliance_check').length,
    },
    events: relevantLogs
  };
};
