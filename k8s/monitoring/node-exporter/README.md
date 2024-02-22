# Node-exporter Kubernetes setup :

## Prerequisites
Node-exporter is running on the monitoring namespace, created when deploying the Prometheus stack.

## Deploy
Create the node-exporter demonset
```bash
kubectl create -f node-exporter-daemonset.yaml
```

Create the node-exporter service
```bash
kubectl apply -f node-exporter-service.yaml
```

## Access
The node-exporter will be linked to the Prometheus.

## Clean up
```bash
kubectl delete -f node-exporter-daemonset.yaml
kubectl delete -f node-exporter-service.yaml
```

## Configuration
The node-exporter is configured to collect metrics from the host system. The configuration is defined in the `node-exporter-daemonset.yaml` file.
