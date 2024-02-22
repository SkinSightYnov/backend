# Monitoring Stack for Kubernetes:
- [Prometheus](https://prometheus.io/docs/introduction/overview/) : ✔️
- [Loki + promtail](https://grafana.com/docs/loki/latest/clients/promtail/) ✔️
- [Grafana](https://grafana.com/docs/grafana/latest/getting-started/getting-started-prometheus/) : ✔️
- [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) : ✔️
- [Node Exporter](https://github.com/prometheus/node_exporter) : ✔️
- [Kube State Metrics](https://github.com/kubernetes/kube-state-metrics) : ✔️

## Prerequisites
If running on GKE :
you'll need to give your account cluster-admin role to be able to create cluster role binding for prometheus service account.
```bash
ACCOUNT=$(gcloud info --format='value(config.account)')
kubectl create clusterrolebinding owner-cluster-admin-binding \
    --clusterrole cluster-admin \
    --user $ACCOUNT
```

Create a namespace for monitoring
```bash
kubectl create namespace monitoring
```

## Folder Structure
- [monitoring](./) : contains the kubernetes manifests for the monitoring stack
  - [alert-manager](./alert-manager) : contains the kubernetes manifests for the alertmanager
  - [grafana](./grafana) : contains the kubernetes manifests for the grafana
  - [loki](./loki) : contains the kubernetes manifests for the loki
  - [node-exporter](./node-exporter) : contains the kubernetes manifests for the node-exporter
  - [prometheus](./prometheus) : contains the kubernetes manifests for the prometheus
  - [promtail](./promtail) : contains the kubernetes manifests for the promtail
  - [state-metrics](./state-metrics) : contains the kubernetes manifests for the kube-state-metrics

## Deploy

you can use the script `deploy.sh` to deploy the monitoring stack to your kubernetes cluster.

```bash
./deploy_all.sh
```

## Cleanup

you can use the script `cleanup.sh` to delete the monitoring stack from your kubernetes cluster.

```bash
./cleanup_all.sh
```


## Access
you can use the following commands to get the node port for the services:

```bash
kubectl get svc -n monitoring
```


### Prometheus
The prometheus can be accessed through the service on node port 30000

### Grafana
The grafana can be accessed through the service on node port 32000
#### Default Credentials
- username: admin
- password: admin

### Alertmanager
The alertmanager can be accessed through the service on node port 31000
