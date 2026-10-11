//
//  CoreTypes.swift
//  Acai-Swift
//
//  Minimal in-repo foundation types used across the SDK.
//
import Foundation

/// Verbosity of SDK logging. Higher raw values log more.
public enum LogLevel: Int, Sendable {
    case off
    case error
    case warn
    case log
    case debug
}

/// Region used to select the ingestion endpoint.
@objc(AMPServerZone)
public enum ServerZone: Int, Sendable {
    case US
    case EU
}

/// Minimal event abstraction handed to plugins that do not know about `BaseEvent`.
public protocol AnalyticsEvent {
    var eventType: String { get set }
    var eventProperties: [String: Any]? { get set }
    var userProperties: [String: Any]? { get set }
}

/// Base protocol shared by every plugin type.
public protocol UniversalPlugin: AnyObject {
    var name: String? { get }
    func execute<Event: AnalyticsEvent>(_ event: inout Event)
    func onIdentityChanged(_ identity: Identity)
    func onSessionIdChanged(_ sessionId: Int64)
    func onOptOutChanged(_ optOut: Bool)
    func onReset()
    func teardown()
}

public extension UniversalPlugin {
    var name: String? { nil }
    func execute<Event: AnalyticsEvent>(_ event: inout Event) {}
    func onIdentityChanged(_ identity: Identity) {}
    func onSessionIdChanged(_ sessionId: Int64) {}
    func onOptOutChanged(_ optOut: Bool) {}
    func onReset() {}
    func teardown() {}
}

/// Something that can look up installed plugins.
public protocol PluginHost: AnyObject {
    func plugin(name: String) -> UniversalPlugin?
    func plugins<PluginType: UniversalPlugin>(type: PluginType.Type) -> [PluginType]
}

/// A change in the visible interface, reported by an `InterfaceSignalProvider`.
public struct InterfaceChangeSignal {
    public let time: Date

    public init(time: Date) {
        self.time = time
    }
}

/// Receives interface change notifications.
public protocol InterfaceSignalReceiver: AnyObject {
    func onInterfaceChanged(signal: InterfaceChangeSignal)
    func onStartProviding()
    func onStopProviding()
}

/// Source of interface change notifications, used for dead click detection.
public protocol InterfaceSignalProvider: AnyObject {
    var isProviding: Bool { get }
    func addInterfaceSignalReceiver(_ receiver: InterfaceSignalReceiver)
    func removeInterfaceSignalReceiver(_ receiver: InterfaceSignalReceiver)
}
